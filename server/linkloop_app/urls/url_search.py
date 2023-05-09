from rest_framework import routers
from ..views.view_search import SearchViewSet, SearchQueryViewSet

router = routers.DefaultRouter()
router.register(r'query', SearchViewSet, basename='search')
router.register(r'search_query', SearchQueryViewSet, basename='search_query')

urlpatterns: list = list()
urlpatterns.extend(router.urls)
