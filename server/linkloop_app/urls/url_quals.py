from rest_framework import routers

from ..views.views_quals import (
    SkillsModelViewSet,
    EducationModelViewSet,
    ExperienceModelViewSet,
)
router = routers.DefaultRouter()
router.register(r'skills', SkillsModelViewSet, basename='skills')
router.register(r'education', EducationModelViewSet, basename='education')
router.register(r'experience', ExperienceModelViewSet, basename='experience')

urlpatterns: list = list()
urlpatterns.extend(router.urls)