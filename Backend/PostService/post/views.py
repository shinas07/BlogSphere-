from django.shortcuts import render
from rest_framework import generics
from .models import CustomCard
from .serializers import CustomCardSerializer

class CustomCardListCreateView(generics.ListCreateAPIView):
    queryset = CustomCard.objects.all()
    serializer_class = CustomCardSerializer


