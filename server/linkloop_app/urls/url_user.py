from rest_framework import routers

from linkloop_app.views.view_user import (
    SignUpUserModelViewSet,
    UserModelViewSet
)

router = routers.DefaultRouter()
router.register(r'signup', SignUpUserModelViewSet, basename='sign up')
router.register(r'data', UserModelViewSet, basename='data')

urlpatterns: list = list()
urlpatterns.extend(router.urls)
