import os
import uuid

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication
import django_filters

from ..boto3.upload_file import upload_file_to_s3
from ..models import Profile, ProfileImpression

from ..serializers.serializer_profile import (
    ProfileSerializer,
    ProfileImpressionSerializer
)


class ProfileFilter(django_filters.FilterSet):
    username = django_filters.CharFilter(field_name='user__username', lookup_expr='iexact')
    first_name = django_filters.CharFilter(field_name='user__first_name', lookup_expr='iexact')
    last_name = django_filters.CharFilter(field_name='user__last_name', lookup_expr='iexact')
    rating = django_filters.NumberFilter(field_name='rating', lookup_expr='exact')
    min_rating = django_filters.NumberFilter(field_name='rating', lookup_expr='gt')
    max_rating = django_filters.NumberFilter(field_name='rating', lookup_expr='lt')
    location = django_filters.CharFilter(field_name='location', lookup_expr='icontains')
    is_rating_null = django_filters.BooleanFilter(field_name='rating', lookup_expr='isnull')

    class Meta:
        model = Profile
        fields = ['username', 'first_name', 'last_name', 'min_rating', 'max_rating', 'location', 'is_rating_null']


class ProfileModelViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    authentication_classes = [JWTAuthentication]
    filterset_class = ProfileFilter
    allowed_methods = ['GET', 'POST', 'DELETE', 'PATCH', 'PUT']

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        user_id = request.user.pk
        profile = Profile.objects.filter(user=user_id).first()
        if profile:
            return Response({'detail': 'User already has a profile'}, status=status.HTTP_400_BAD_REQUEST)

        data_copy = request.data.copy()
        data_copy["user"] = request.user.pk
        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        user_id = request.user.pk
        profile = Profile.objects.filter(user=user_id).first()
        if not profile:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        partial = kwargs.pop('partial', False)
        user_id = request.user.pk
        profile = Profile.objects.filter(user=user_id).first()
        data = request.data.copy()
        print(data)

        if 'profile_pic' in data:
            img_unique_id = uuid.uuid1()
            img_file = data.pop('profile_pic')[0]
            file, ext = os.path.splitext(img_file.name)
            if img_file.size > 307200:
                return Response({'error': 'File size is too large'}, status=status.HTTP_400_BAD_REQUEST)
            data["profile_picture"] = upload_file_to_s3(
                filename=img_file.file,
                bucket_name='linkloop',
                obj_key=f'profile_pics/{img_unique_id}{ext}')

        serializer = self.get_serializer(profile, data=data, partial=partial)
        if not serializer.is_valid():
            serializer.is_valid(raise_exception=True)

        user = get_user_model().objects.get(pk=user_id)
        if 'profile_pic' in data:
            first_name, last_name = request.data.get('first_name'), request.data.get('last_name')
            if not first_name and not last_name:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            user.first_name = first_name
            user.last_name = last_name
        user.save()
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        user_id = request.user.pk
        profile = Profile.objects.filter(user=user_id)
        if not profile:
            return Response(status=status.HTTP_404_NOT_FOUND)

        self.perform_destroy(profile)
        return Response(status=status.HTTP_204_NO_CONTENT)


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
