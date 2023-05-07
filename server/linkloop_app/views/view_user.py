import django_filters
from django.contrib.auth.models import User
from rest_framework import mixins, status
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from ..serializers.serializer_user import SignUpUserSerializer, UserSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication


class SignUpUserModelViewSet(mixins.CreateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = SignUpUserSerializer
    permission_classes = [AllowAny]
    format_kwarg = None

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        is_staff = self.request.data.get('is_staff', False)
        if is_staff and not request.user.is_staff:
            return Response({'detail': 'You do not have permission to create a staff user.'},
                            status=status.HTTP_403_FORBIDDEN)
        else:
            self.permission_classes = [AllowAny]
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



class UserFilter(django_filters.FilterSet):
    username = django_filters.CharFilter(field_name='username', lookup_expr='iexact')
    email = django_filters.CharFilter(field_name='email', lookup_expr='iexact')
    first_name = django_filters.CharFilter(field_name='first_name', lookup_expr='iexact')
    last_name = django_filters.CharFilter(field_name='last_name', lookup_expr='iexact')

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']

class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    filterset_class = UserFilter
    allowed_methods = ['GET', 'POST', 'DELETE']

    def retrieve(self, request, *args, **kwargs):
        user_id = request.user.pk
        user = User.objects.filter(id=user_id).first()
        if not user:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
