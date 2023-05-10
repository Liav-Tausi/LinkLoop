from django.contrib.auth.models import User
from google.auth.transport import requests
from google.oauth2 import id_token
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from ..serializers.serializer_user import SignUpUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
import os


@api_view(['POST'])
@permission_classes([AllowAny])
def get_google_client_id(request):
    CLIENT_ID = os.environ.get('REACT_APP_GOOGLE_AUTH_CLIENT_ID')
    google_token = request.headers['Authorization']
    credential = id_token.verify_oauth2_token(google_token, requests.Request(), CLIENT_ID)
    try:
        user = User.objects.get(email=credential['email'])
        tokens = get_tokens_for_user(user)
        return Response(tokens, status=status.HTTP_200_OK)
    except Exception:
        data_copy = {
            'email': credential['email'],
            'first_name': credential['given_name'],
            'last_name': credential['family_name'],
            'password': credential['sub'] + credential['email'],
            'confirm_password': credential['sub'] + credential['email'],
            'is_staff': False
        }
        serializer = SignUpUserSerializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        tokens = get_tokens_for_user(user)
        return Response(tokens, status=status.HTTP_201_CREATED)


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
