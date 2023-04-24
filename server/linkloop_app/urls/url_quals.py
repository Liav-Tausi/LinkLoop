from rest_framework import routers

from ..views.views_quals import (
    SkillsModelViewSet,
    EducationModelViewSet,
    ExperienceModelViewSet,
    QualsViewSet,
)
router = routers.DefaultRouter()
router.register(r'main', QualsViewSet, basename='main')
router.register(r'skill', SkillsModelViewSet, basename='skills')
router.register(r'education', EducationModelViewSet, basename='education')
router.register(r'experience', ExperienceModelViewSet, basename='experience')

urlpatterns: list = list()
urlpatterns.extend(router.urls)