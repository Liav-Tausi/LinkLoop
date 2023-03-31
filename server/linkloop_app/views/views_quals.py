from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication
from linkloop_app.models import (
    Skill,
    Education,
    Experience,
    UserSkill,
    UserEducation
)
from linkloop_app.serializers.serializer_quals import (
    SkillsSerializer,
    EducationSerializer,
    ExperienceSerializer,
    ExperienceUserSerializer,
    EducationUserSerializer,
    SkillsUserSerializer
)


# ____________________skills_______________________#

class SkillsModelViewSet(ModelViewSet):
    queryset = Skill.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = SkillsSerializer
    authentication_classes = [JWTAuthentication]


class SkillsUserModelViewSet(ModelViewSet):
    queryset = UserSkill.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = SkillsUserSerializer
    authentication_classes = [JWTAuthentication]

    def create(self, request, *args, **kwargs):
        data_copy = request.data.copy()
        data_copy["user"] = request.user.pk
        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


# ____________________education_______________________#


class EducationModelViewSet(ModelViewSet):
    queryset = Education.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = EducationSerializer
    authentication_classes = [JWTAuthentication]


class EducationUserModelViewSet(ModelViewSet):
    queryset = UserEducation.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = EducationUserSerializer
    authentication_classes = [JWTAuthentication]

    def create(self, request, *args, **kwargs):
        data_copy = request.data.copy()
        data_copy["user"] = request.user.pk
        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


# ____________________experience_______________________#


class ExperienceModelViewSet(ModelViewSet):
    queryset = Experience.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ExperienceSerializer
    authentication_classes = [JWTAuthentication]


class ExperienceUserModelViewSet(ModelViewSet):
    queryset = Experience.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ExperienceUserSerializer

    def create(self, request, *args, **kwargs):
        data_copy = request.data.copy()
        data_copy["user"] = request.user.pk
        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
