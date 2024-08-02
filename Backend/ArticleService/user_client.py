import grpc
import user_pb2
import user_pb2_grpc

# def get_user_info(user_id):
#     with grpc.insecure_channel('localhost:50051') as channel:
#         stub = user_pb2_grpc.UserServiceStub(channel)
#         request = user_pb2.UserRequest(user_id=user_id)
#         response = stub.GetUser(request)
#         return response

# # Example usage
# user_info = get_user_info("12345")
# print(f"User ID: {user_info.user_id}, Username: {user_info.username}, Email: {user_info.email}")


import grpc
from concurrent import futures
import blog_service_pb2
import blog_service_pb2_grpc
import requests

class BlogService(blog_service_pb2_grpc.BlogServiceServicer):
    def __init__(self, user_service_stub):
        self.user_service_stub = user_service_stub

    def CreateArticle(self, request, context):
        user_id = request.user_id
        try:
            user_request = blog_service_pb2.UserRequest(user_id=user_id)
            user_response = self.user_service_stub.GetUser(user_request)
            # Verify the JWT token or user details and save article
            article_id = "generated_id"  # Example article ID
            return blog_service_pb2.ArticleResponse(article_id=article_id, title=request.title)
        except grpc.RpcError as e:
            context.set_details('User verification failed')
            context.set_code(grpc.StatusCode.UNAUTHENTICATED)
            return blog_service_pb2.ArticleResponse()

def serve():
    # Connect to User Server
    channel = grpc.insecure_channel('localhost:50051')
    user_service_stub = user_service_pb2_grpc.UserServiceStub(channel)

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    blog_service_pb2_grpc.add_BlogServiceServicer_to_server(BlogService(user_service_stub), server)
    server.add_insecure_port('[::]:50052')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
