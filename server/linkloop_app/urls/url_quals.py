from rest_framework import routers

from linkloop_app.views.views_quals import (
    SkillsModelViewSet,
    EducationModelViewSet,
    ExperienceModelViewSet,
    ExperienceUserModelViewSet,
    EducationUserModelViewSet,
    SkillsUserModelViewSet
)
router = routers.DefaultRouter()
router.register(r'skills', SkillsModelViewSet, basename='skills')
router.register(r'skills_user', SkillsUserModelViewSet, basename='skills_user')

router.register(r'education', EducationModelViewSet, basename='education')
router.register(r'education_user', EducationUserModelViewSet, basename='education_user')

router.register(r'experience', ExperienceModelViewSet, basename='experience')
router.register(r'experience_user', ExperienceUserModelViewSet, basename='experience_user')

urlpatterns: list = list()
urlpatterns.extend(router.urls)