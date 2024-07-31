# card/serializers.py
from rest_framework import serializers
from .models import Post

class CustomCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
