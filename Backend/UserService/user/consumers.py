import pika
import json
import jwt
from django.http import JsonResponse
from rest_framework.exceptions import PermissionDenied

def verify_jwt(token):
    try:
        payload = jwt.decode(token, 'django-insecure-$roc7qpoa5ybcp!ru&w4=xaib+@#nflrvkr+4tzb_@cn49#icn', algorithms=['HS256'])
        return payload
    except jwt.InvalidTokenError:
        raise PermissionDenied("Invalid token")

def consume_messages():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.exchange_declare(exchange='user_verification_exchange', exchange_type='direct', durable=True)
    channel.queue_declare(queue='verify_jwt_queue', durable=True)
    channel.queue_bind(exchange='user_verification_exchange', queue='verify_jwt_queue', routing_key='verify_jwt')
    
    def callback(ch, method, properties, body):
        message = json.loads(body)
        token = message.get('jwt_token')
        try:
            user_details = verify_jwt(token)
            response = json.dumps(user_details)
        except PermissionDenied:
            response = json.dumps({"error": "Invalid token"})
        
        ch.basic_publish(
            exchange='',
            routing_key=properties.reply_to,
            properties=pika.BasicProperties(correlation_id=properties.correlation_id),
            body=response
        )
        ch.basic_ack(delivery_tag=method.delivery_tag)
    
    channel.basic_consume(queue='verify_jwt_queue', on_message_callback=callback, auto_ack=False)
    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

if __name__ == "__main__":
    consume_messages()
