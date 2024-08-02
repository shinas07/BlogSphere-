from rest_framework import viewsets
from .models import Article
from .serializers import ArticleSerializer
from rest_framework  import status  
from rest_framework.views  import APIView  
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .grpc_client import verify_jwt_token
# Create your views here.


# class ArticleCreateView(APIView):
#     permission_class = [IsAuthenticated]
#     def post(self, request, *args, **kwargs):
#         serializer = ArticleSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class ArticleCreateView(APIView):
#     permission_classes = [IsAuthenticated]
    
#     def post(self, request, *args, **kwargs):
#         token = request.headers.get('Authorization', '').replace('Bearer ', '')
#         is_valid, user_id = verify_jwt_token(token)
        
#         if not is_valid:
#             return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

#         # Proceed with creating the article
#         serializer = ArticleSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import grpc
import blog_service_pb2
import blog_service_pb2_grpc

class ArticleCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Assuming you have JWT token in the request headers
        jwt_token = request.headers.get('Authorization').split(' ')[1]
        try:
            # Connect to gRPC User Server
            channel = grpc.insecure_channel('localhost:50051')
            stub = blog_service_pb2_grpc.UserServiceStub(channel)
            user_request = blog_service_pb2.UserRequest(user_id=request.user.id)
            user_response = stub.GetUser(user_request)
            # Proceed with saving the article
            serializer = ArticleSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except grpc.RpcError as e:
            return Response({'error': 'Authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)
