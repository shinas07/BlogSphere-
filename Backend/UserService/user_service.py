# # user_server/user_service.py

# from concurrent import futures
# import grpc
# import user_pb2
# import user_pb2_grpc

# class UserService(user_pb2_grpc.UserServiceServicer):
#     def GetUser(self, request, context):
#         # Simulate fetching user info
#         user_info = {
#             "user_id": request.user_id,
#             "username": "example_username",
#             "email": "example@example.com"
#         }
#         return user_pb2.UserResponse(**user_info)

# def serve():
#     server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
#     user_pb2_grpc.add_UserServiceServicer_to_server(UserService(), server)
#     server.add_insecure_port('[::]:50051')
#     server.start()
#     server.wait_for_termination()

# if __name__ == '__main__':
#     serve()


# user_service.py
import grpc
from concurrent import futures
import user_pb2
import user_pb2_grpc
from user.models import User

class UserService(user_pb2_grpc.UserServiceServicer):
    def GetUser(self, request, context):
        try:
            user = User.objects.get(id=request.user_id)
            return user_pb2.UserResponse(
                user_id=user.id,
                username=user.username,
                email=user.email
            )
        except User.DoesNotExist:
            context.set_details(f"User with ID {request.user_id} not found.")
            context.set_code(grpc.StatusCode.NOT_FOUND)
            return user_pb2.UserResponse()

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    user_pb2_grpc.add_UserServiceServicer_to_server(UserService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Server running on port 50051")
    server.wait_for_termination()

