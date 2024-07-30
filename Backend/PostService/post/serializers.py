# card/serializers.py
from rest_framework import serializers
from .models import CustomCard

class CustomCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomCard
        fields = ['id', 'card_type', 'card_name', 'description', 'details']
