from rest_framework import routers
from linkloop_app.views.view_profile import (
    ProfileModelViewSet,
    ProfileImpressionModelViewSet
)

router = routers.DefaultRouter()
router.register(r'main', ProfileModelViewSet, basename='profile')
router.register(r'impression', ProfileImpressionModelViewSet, basename='profile_impression')

urlpatterns: list = list()
urlpatterns.extend(router.urls)