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


class VideosModelViewSet(ModelViewSet):
    queryset = Video.objects.all()
    permission_classes = [AllowAny]
    depth = 3

    serializer_class = {
        "list": BaseVideoSerializer,
        "retrieve": BaseVideoSerializer,
        "create": CreateVideoSerializer,
        "destroy": BaseVideoSerializer,
    }

    def create(self, request, *args, **kwargs):
        data_copy = request.data.copy()
        data_copy["user"] = request.user.pk
        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_permissions(self):
        if self.action in ['create', 'destroy']:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def get_serializer_class(self):
        return self.serializer_class[self.action]


class LikesModelViewSet(ModelViewSet):
    queryset = VideoLike.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = LikeVideoSerializer
    authentication_classes = [JWTAuthentication]

    def create(self, request, *args, **kwargs):
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
        like = VideoLike.objects.filter(video=video_pk)
        if like:
            serializer = self.get_serializer(like, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)



class CommentsModelViewSet(ModelViewSet):
    queryset = VideoComment.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    authentication_classes = [JWTAuthentication]

    def create(self, request, *args, **kwargs):
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
        comments = VideoComment.objects.filter(video=video_pk)
        if comments.exists():
            serializer = self.get_serializer(comments, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


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

