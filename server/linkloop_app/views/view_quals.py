import django_filters
from rest_framework import status
from rest_framework.permissions import AllowAny
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


class QualsViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthentication]
    allowed_methods = ['GET']
    queryset = Skill.objects.all()
    serializer_class = ExperienceSerializer

    def get_queryset(self):
        username = self.request.query_params.get('username')
        queryset = {
            'skills': Skill.objects.filter(user__username=username),
            'education': Education.objects.filter(user__username=username),
            'experience': Experience.objects.filter(user__username=username),
        }
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serialized_data = {
            'skills': SkillsSerializer(queryset['skills'], many=True).data,
            'education': EducationSerializer(queryset['education'], many=True).data,
            'experience': ExperienceSerializer(queryset['experience'], many=True).data
        }
        return Response(serialized_data, status=status.HTTP_200_OK)



class SkillsFilter(django_filters.FilterSet):
    skill_name = django_filters.CharFilter(field_name='education_name', lookup_expr='iexact')
    skill_level = django_filters.CharFilter(field_name='education_school', lookup_expr='iexact')

    class Meta:
        model = Skill
        fields = ['skill_name', 'skill_level']


class SkillsModelViewSet(ModelViewSet):
    queryset = Skill.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SkillsSerializer
    authentication_classes = [JWTAuthentication]
    allowed_methods = ['GET', 'POST', 'DELETE', 'PATCH', 'PUT']

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
        skill = Skill.objects.filter(user=user_id).first()
        if not skill:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(skill)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        user_id = request.user.pk
        skill_name = request.query_params.get('skill_name')
        skill = Skill.objects.filter(user=user_id, skill_name=skill_name).first()
        serializer = self.get_serializer(skill, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        user_id = request.user.pk
        skill_name = request.query_params.get('skill_name')
        skill = Skill.objects.filter(user=user_id, skill_name=skill_name)
        if not skill:
            return Response(status=status.HTTP_404_NOT_FOUND)

        self.perform_destroy(skill)
        return Response(status=status.HTTP_204_NO_CONTENT)


class EducationFilter(django_filters.FilterSet):
    education_name = django_filters.CharFilter(field_name='education_name', lookup_expr='iexact')
    education_description = django_filters.CharFilter(field_name='education_description', lookup_expr='icontains')
    education_school = django_filters.CharFilter(field_name='education_school', lookup_expr='iexact')
    start_date = django_filters.CharFilter(field_name='start_date', lookup_expr='iexact')
    end_date = django_filters.NumberFilter(field_name='end_date', lookup_expr='exact')

    class Meta:
        model = Education
        fields = ['education_name', 'education_description', 'education_school', 'start_date', 'end_date']


class EducationModelViewSet(ModelViewSet):
    queryset = Education.objects.all()
    permission_classes = [AllowAny]
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
        education_name = request.query_params.get('education_name')
        education = Education.objects.filter(user=user_id, education_name=education_name).first()
        serializer = self.get_serializer(education, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        user_id = request.user.pk
        education_name = request.query_params.get('education_name')
        education_description = request.query_params.get('education_description')
        if education_description:
            education = Education.objects.filter(user=user_id, education_description=education_description).first()
        else:
            education = Education.objects.filter(user=user_id, education_name=education_name).first()
        if not education:
            return Response(status=status.HTTP_404_NOT_FOUND)

        self.perform_destroy(education)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ExperienceFilter(django_filters.FilterSet):
    experience_name = django_filters.CharFilter(field_name='experience_name', lookup_expr='iexact')
    experience_description = django_filters.CharFilter(field_name='experience_description', lookup_expr='icontains')
    start_date = django_filters.CharFilter(field_name='start_date', lookup_expr='iexact')
    end_date = django_filters.NumberFilter(field_name='end_date', lookup_expr='exact')

    class Meta:
        model = Experience
        fields = ['experience_name', 'experience_description', 'start_date', 'end_date']


class ExperienceModelViewSet(ModelViewSet):
    queryset = Experience.objects.all()
    permission_classes = [AllowAny]
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
        experience_description = request.query_params.get('experience_description')
        if experience_description:
            experience = Experience.objects.filter(user=user_id, experience_description=experience_description)
        else:
            experience = Experience.objects.filter(user=user_id, experience_name=experience_name)
        print(experience)
        if not experience:
            return Response(status=status.HTTP_404_NOT_FOUND)

        self.perform_destroy(experience)
        return Response(status=status.HTTP_204_NO_CONTENT)
