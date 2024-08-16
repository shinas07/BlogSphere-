from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
import requests

class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            raise AuthenticationFailed(_('No Authorization header found'))

        try:
            token = auth_header.split(' ')[1]
        except IndexError:
            raise AuthenticationFailed(_('Invalid token header format'))

        user_details = self.verify_token_with_user_service(token)
        print(user_details)
        if not user_details:
            print('there is no user detail')
            raise AuthenticationFailed(_('Invalid token or user not found'))
        

        return (token, user_details)
    
    def verify_token_with_user_service(self, token):
        user_service_url = 'http://127.0.0.1:8000/api/verify_jwt/'
        response = requests.post(user_service_url, json={'jwt_token': token}, headers={'Content-Type': 'application/json'})
        print(response)
        if response.status_code == 200:
            print("Data Receivd:", response.json())
            return response.json()
        return None

    