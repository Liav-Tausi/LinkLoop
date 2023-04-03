from rest_framework import routers
from ..views.view_search import SearchModelViewSet


router = routers.DefaultRouter()
router.register(r'main', SearchModelViewSet, basename='search')

urlpatterns: list = list()
urlpatterns.extend(router.urls)
