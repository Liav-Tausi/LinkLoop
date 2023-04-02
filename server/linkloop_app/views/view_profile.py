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
    first_name = django_filters.CharFilter(field_name='user__first_name', lookup_expr='iexact')
    last_name = django_filters.CharFilter(field_name='user__last_name', lookup_expr='iexact')
    rating = django_filters.NumberFilter(field_name='rating', lookup_expr='exact')
    min_rating = django_filters.NumberFilter(field_name='rating', lookup_expr='gt')
    max_rating = django_filters.NumberFilter(field_name='rating', lookup_expr='lt')
    location = django_filters.CharFilter(field_name='location', lookup_expr='icontains')
    is_rating_null = django_filters.BooleanFilter(field_name='rating', lookup_expr='isnull')

    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'min_rating', 'max_rating', 'location', 'is_rating_null']


class ProfileModelViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    authentication_classes = [JWTAuthentication]
    filterset_class = ProfileFilter

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
