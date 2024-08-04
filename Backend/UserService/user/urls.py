# user/urls.py
from django.urls import path
from .views import RegisterView, LoginView
from .views import TokenRefreshView, verify_jwt
from . import views

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('verify_jwt/',views.verify_jwt,name='varify_jwt'),
]
