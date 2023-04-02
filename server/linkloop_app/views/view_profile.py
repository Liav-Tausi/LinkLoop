from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication
import django_filters
from ..models import Profile, ProfileImpression

from ..serializers.serializer_profile import (
    ProfileSerializer,
    ProfileImpressionSerializer
)


class ProfileFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='iexact')

    class Meta:
        model = User
        fields = ['username']


class ProductFilter(django_filters.FilterSet):
    pass


class ProfileModelViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    authentication_classes = [JWTAuthentication]

    def create(self, request, *args, **kwargs):
        data_copy = request.data.copy()
        data_copy["user"] = request.user.pk
        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ProfileImpressionModelViewSet(ModelViewSet):
    queryset = ProfileImpression.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ProfileImpressionSerializer

    def create(self, request, *args, **kwargs):
        data_copy = request.data.copy()
        data_copy["viewer"] = request.user.pk
        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
