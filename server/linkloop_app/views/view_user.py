from django.contrib.auth.models import User
from rest_framework import mixins, status
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from linkloop_app.serializers.serializer_user import SignUpUserSerializer, UserSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication


class SignUpUserModelViewSet(mixins.CreateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = SignUpUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        is_staff = request.data.get('is_staff', False)
        if is_staff and not request.user.is_staff:
            return Response({'detail': 'You do not have permission to create a staff user.'},
                            status=status.HTTP_403_FORBIDDEN)
        else:
            self.permission_classes = [AllowAny]

        return super().create(request, *args, **kwargs)


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsAdminUser]
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        email = self.request.query_params.get('email')
        first_name = self.request.query_params.get('first_name')
        last_name = self.request.query_params.get('last_name')
        is_staff = self.request.query_params.get('is_staff')

        if email:
            self.queryset.filter(email=email)
        if first_name:
            self.queryset.filter(first_name=first_name)
        if last_name:
            self.queryset.filter(last_name=last_name)
        if is_staff:
            self.queryset.filter(is_staff=is_staff)
        return self.queryset
