from rest_framework import routers

from ..views.view_comms import (
    MessagesModelViewSet,
)
router = routers.DefaultRouter()
router.register(r'messages', MessagesModelViewSet, basename='messages')

urlpatterns: list = list()
urlpatterns.extend(router.urls)
