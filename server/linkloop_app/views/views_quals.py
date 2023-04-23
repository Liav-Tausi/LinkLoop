import django_filters
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication
from ..models import (
    Skill,
    Education,
    Experience,
)
from ..serializers.serializer_quals import (
    SkillsSerializer,
    EducationSerializer,
    ExperienceSerializer,
)


class SkillsModelViewSet(ModelViewSet):
    queryset = Skill.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = SkillsSerializer
    authentication_classes = [JWTAuthentication]
    allowed_methods = ['GET', 'POST', 'DELETE']

    def create(self, request, *args, **kwargs):
        data_copy = request.data.copy()
        data_copy["user"] = request.user.pk
        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class EducationFilter(django_filters.FilterSet):
    education_name = django_filters.CharFilter(field_name='education_name', lookup_expr='iexact')
    education_school = django_filters.CharFilter(field_name='education_school', lookup_expr='iexact')
    education_description = django_filters.CharFilter(field_name='education_description', lookup_expr='iexact')
    start_date = django_filters.CharFilter(field_name='start_date', lookup_expr='iexact')
    end_date = django_filters.NumberFilter(field_name='end_date', lookup_expr='exact')

    class Meta:
        model = Education
        fields = ['education_name', 'education_description', 'start_date', 'end_date']


class EducationModelViewSet(ModelViewSet):
    queryset = Education.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = EducationSerializer
    authentication_classes = [JWTAuthentication]
    filterset_class = EducationFilter
    allowed_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

    def create(self, request, *args, **kwargs):
        data_copy = request.data.copy()
        data_copy["user"] = request.user.pk
        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        user_id = request.user.pk
        education = Education.objects.filter(user=user_id).first()
        if not education:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(education)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        user_id = request.user.pk
        education_name = request.query_params.get('experience_name')
        education = Education.objects.filter(user=user_id, education_name=education_name).first()
        serializer = self.get_serializer(education, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        user_id = request.user.pk
        education_name = request.query_params.get('education_name')
        education = Education.objects.filter(user=user_id, education_name=education_name)
        if not education:
            return Response(status=status.HTTP_404_NOT_FOUND)

        self.perform_destroy(education)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ExperienceFilter(django_filters.FilterSet):
    experience_name = django_filters.CharFilter(field_name='experience_name', lookup_expr='iexact')
    experience_description = django_filters.CharFilter(field_name='experience_description', lookup_expr='iexact')
    start_date = django_filters.CharFilter(field_name='start_date', lookup_expr='iexact')
    end_date = django_filters.NumberFilter(field_name='end_date', lookup_expr='exact')

    class Meta:
        model = Experience
        fields = ['experience_name', 'experience_description', 'start_date', 'end_date']


class ExperienceModelViewSet(ModelViewSet):
    queryset = Experience.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ExperienceSerializer
    authentication_classes = [JWTAuthentication]
    filterset_class = ExperienceFilter
    allowed_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

    def create(self, request, *args, **kwargs):
        data_copy = request.data.copy()
        data_copy["user"] = request.user.pk
        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        user_id = request.user.pk
        experience = Experience.objects.filter(user=user_id).first()
        if not experience:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(experience)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        user_id = request.user.pk
        experience_name = request.query_params.get('experience_name')
        experience = Experience.objects.filter(user=user_id, experience_name=experience_name).first()
        serializer = self.get_serializer(experience, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        user_id = request.user.pk
        experience_name = request.query_params.get('experience_name')
        experience = Experience.objects.filter(user=user_id, experience_name=experience_name)
        if not experience:
            return Response(status=status.HTTP_404_NOT_FOUND)

        self.perform_destroy(experience)
        return Response(status=status.HTTP_204_NO_CONTENT)

