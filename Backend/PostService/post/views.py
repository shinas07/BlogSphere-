from django.shortcuts import render
from rest_framework import generics
from .models import Post
from .serializers import CustomCardSerializer

class CustomCardListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = CustomCardSerializer


