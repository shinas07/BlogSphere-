from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
import requests
import jwt
from .serializers import ArticleSerializer
from .authentication import JWTAuthentication
from .models import Article
from .serializers import ArticleSerializer


class ArticleCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    def post(self, request, *args, **kwargs):
        # Extract the token from the Authorization header
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return Response({"error": "Authorization header missing"}, status=status.HTTP_401_UNAUTHORIZED)
        

        try:
            token = auth_header.split(' ')[1]
        except IndexError:
            return Response({"error": "Invalid token format"}, status=status.HTTP_401_UNAUTHORIZED)
        
        _, user_details = JWTAuthentication().authenticate(request)

        serializer_data = {
            'title': request.data.get('title'),
            'content': request.data.get('content'),
            'image': request.data.get('image'),
            'author_username': user_details['user']['username'],
            'author_email': user_details['user']['email']
        }
        

        serializer = ArticleSerializer(data=serializer_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ArticleListView(generics.ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleDetailedView(APIView):
    def get(self, request, id):
        try:
            article = Article.objects.get(pk=id)
            serializer = ArticleSerializer(article)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Article.DoesNotExist:
            return Response({"error": "Article not found"}, status=status.HTTP_404_NOT_FOUND)


