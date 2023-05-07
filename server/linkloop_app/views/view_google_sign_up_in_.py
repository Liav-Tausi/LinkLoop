import jwt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from ..serializers.serializer_user import SignUpUserSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def get_google_client_id(request):
    credential = jwt.decode(request.data.get('credential'), options={"verify_signature": False})
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
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
