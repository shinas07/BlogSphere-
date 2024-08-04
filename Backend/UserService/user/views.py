from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework import  views, status
from rest_framework.response import Response
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
import jwt




class TokenRefreshView(generics.GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh')
        if refresh_token is None:
            return Response({'error': 'Refresh token is required'}, status=400)

        try:
            token = RefreshToken(refresh_token)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

        access_token = token.access_token
        return Response({'access': str(access_token), 'refresh': str(token), 'token_type': 'bearer'})


class RegisterView(views.APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']  # Corrected line

            user = authenticate(request, username=username, password=password)
            print(user)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






@api_view(['POST'])
@permission_classes([AllowAny])
def verify_jwt(request):
    token = request.data.get('jwt_token')
    # print(f'Token received: {token}')
    if not token:
        return JsonResponse({'error': 'JWT token is missing'}, status=400)
    
    
    try:
        payload = jwt.decode(token, 'django-insecure-$roc7qpoa5ybcp!ru&w4=xaib+@#nflrvkr+4tzb_@cn49#icn', algorithms=['HS256'])
        user_queryset  = User.objects.filter(id=payload['user_id'])
        if user_queryset.exists():
            user = user_queryset.first()
            user_data = {
                'id' : user.id,
                'username' : user.username,
                'email' : user.email,
            }
        # print(user_data)
        # print(f'Paylo   ad: {payload}')
        return JsonResponse({
                'token_payload': payload,
                'user': user_data
            })
    
    except jwt.ExpiredSignatureError:
        # print('Token has expired')
        return JsonResponse({"error": "Token has expired"}, status=403)
    except jwt.InvalidTokenError as e:
        # print(f'Invalid token error: {str(e)}')
        return JsonResponse({"error": "Invalid token"}, status=403)
    except Exception as e:
        # print(f'Unexpected error decoding JWT: {str(e)}')
        return JsonResponse({"error": "An unexpected error occurred"}, status=500)




