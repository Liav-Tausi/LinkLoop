from django_filters import filters
from django_filters.rest_framework import DjangoFilterBackend
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
    allowed_methods = ['GET', 'POST', 'DELETE']

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
        serializer = self.get_serializer(profile, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

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
