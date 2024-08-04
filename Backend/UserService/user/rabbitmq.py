import pika

def callback(ch, method, properties, body):
    print(f"Received message: {body.decode()}")

def consume_messages():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    channel.queue_declare(queue='', exclusive=True)
    result = channel.queue_declare(queue='', exclusive=True)
    queue_name = result.method.queue

    channel.queue_bind(exchange='articles_exchange',
                       queue=queue_name,
                       routing_key='articles.routing.key')

    channel.basic_consume(queue=queue_name,
                          on_message_callback=callback,
                          auto_ack=True)

    print('Waiting for messages. Press CTRL+C to exit.')
    channel.start_consuming()

if __name__ == "__main__":
    consume_messages()
