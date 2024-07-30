# card/urls.py
from django.urls import path
from .views import CustomCardListCreateView

urlpatterns = [
    path('cards/', CustomCardListCreateView.as_view(), name='card-list-create'),
]
