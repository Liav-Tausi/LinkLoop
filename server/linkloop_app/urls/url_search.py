from rest_framework import routers
from ..views.view_search import SearchViewSet

router = routers.DefaultRouter()
router.register(r'query', SearchViewSet, basename='search')

urlpatterns: list = list()
urlpatterns.extend(router.urls)
