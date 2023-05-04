import django_filters
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

from ..models import (
    Video,
    VideoLike,
    VideoComment,
    VideoImpression
)

from ..serializers.serializer_videos import (
    BaseVideoSerializer,
    CreateVideoSerializer,
    LikeVideoSerializer,
    CommentSerializer,
    ImpressionSerializer
)


class VideoFilter(django_filters.FilterSet):
    username = django_filters.CharFilter(field_name='user__username', lookup_expr='iexact')

    class Meta:
        model = Video
        fields = ['username']


class VideoLikeFilter(django_filters.FilterSet):
    username = django_filters.CharFilter(field_name='user__username', lookup_expr='iexact')

    class Meta:
        model = VideoLike
        fields = ['username']


class VideoCommentFilter(django_filters.FilterSet):
    username = django_filters.CharFilter(field_name='user__username', lookup_expr='iexact')

    class Meta:
        model = VideoComment
        fields = ['username']



class VideosModelViewSet(ModelViewSet):
    queryset = Video.objects.all()
    permission_classes = [AllowAny]
    filterset_class = VideoFilter
    depth = 3
    serializer_class = {
        "list": BaseVideoSerializer,
        "retrieve": BaseVideoSerializer,
        "create": CreateVideoSerializer,
        "destroy": BaseVideoSerializer,
    }

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return self.queryset
        else:
            return self.queryset

    def create(self, request, *args, **kwargs):
        data_copy = request.data.copy()
        data_copy["user"] = request.user.pk
        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        user_id = request.user.pk
        video = Video.objects.filter(user=user_id).first()
        if not video:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(video)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_permissions(self):
        if self.action in ['create', 'destroy']:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def get_serializer_class(self):
        return self.serializer_class[self.action]


class LikesModelViewSet(ModelViewSet):
    queryset = VideoLike.objects.all()
    permission_classes = [AllowAny]
    serializer_class = LikeVideoSerializer
    filterset_class = VideoLikeFilter
    authentication_classes = [JWTAuthentication]
    allowed_methods = ['GET', 'POST', 'DELETE']

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        video_id = kwargs['video_pk']
        user_id = request.user.pk
        existing_like = VideoLike.objects.filter(video=video_id, user=user_id).exists()
        if existing_like:
            return Response({'detail': 'You have already liked this video'}, status=status.HTTP_400_BAD_REQUEST)
        data_copy = request.data.copy()
        data_copy["video"] = video_id
        data_copy["user"] = user_id
        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        video_pk = kwargs.get('video_pk')
        like_count = VideoLike.objects.filter(video=video_pk).count()
        return Response({'like_count': like_count})

    def retrieve(self, request, *args, **kwargs):
        video_id = kwargs['video_pk']
        user_id = request.user.pk
        like = VideoLike.objects.filter(video=video_id, user=user_id).first()
        if not like:
            return Response({'detail': 'You have not liked this video yet'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(like)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        video_id = kwargs['video_pk']
        user_id = request.user.pk
        like = VideoLike.objects.filter(video=video_id, user=user_id)
        if not like.exists():
            return Response({'detail': 'You have not liked this video yet'}, status=status.HTTP_404_NOT_FOUND)

        self.perform_destroy(like)
        return Response({'detail': 'You have unliked this video'}, status=status.HTTP_204_NO_CONTENT)


class CommentsModelViewSet(ModelViewSet):
    queryset = VideoComment.objects.all()
    permission_classes = [AllowAny]
    filterset_class = VideoCommentFilter
    serializer_class = CommentSerializer
    authentication_classes = [JWTAuthentication]
    allowed_methods = ['GET', 'POST', 'DELETE']

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        video_id = kwargs['video_pk']
        data_copy = request.data.copy()
        data_copy["video"] = video_id
        data_copy["user"] = request.user.pk
        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        video_pk = kwargs.get('video_pk')
        comment_count = VideoComment.objects.filter(video=video_pk).count()
        comments = VideoComment.objects.filter(video=video_pk)
        if comments.exists():
            serializer = self.get_serializer(comments, many=True)
            return Response({'comment_count': comment_count}, serializer.data)
        else:
            return Response({'comment_count': comment_count})


class ImpressionModelViewSet(ModelViewSet):
    queryset = VideoImpression.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ImpressionSerializer

    def create(self, request, *args, **kwargs):
        video_id = kwargs['video_pk']
        data_copy = request.data.copy()
        data_copy["video"] = video_id
        data_copy["viewer"] = request.user.pk
        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        video_pk = kwargs.get('video_pk')
        impression = VideoImpression.objects.filter(video=video_pk)
        if impression:
            serializer = self.get_serializer(impression, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
