from rest_framework import routers
from ..views.view_videos import (
    VideosModelViewSet,
    LikesModelViewSet,
    CommentsModelViewSet,
    ImpressionModelViewSet
)

router = routers.DefaultRouter()
router.register(r'main', VideosModelViewSet, basename='videos')
router.register(r'(?P<video_pk>\d+)/likes', LikesModelViewSet, basename='video_likes')
router.register(r'(?P<video_pk>\d+)/comments', CommentsModelViewSet, basename='video_comments')
router.register(r'(?P<video_pk>\d+)/impressions', ImpressionModelViewSet, basename='video_impressions')


urlpatterns: list = list()
urlpatterns.extend(router.urls)
