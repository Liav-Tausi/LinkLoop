from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from ..models import Video, Profile, UserSearch
from ..serializers.serializer_profile import ProfileSerializer
from ..serializers.serializer_search import SearchSerializer
from ..serializers.serializer_videos import BaseVideoSerializer
from rest_framework.viewsets import ModelViewSet


class SearchViewSet(viewsets.ViewSet):
    def list(self, request):
        query = request.query_params.get('q', None)
        if not query:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        videos = Video.objects.filter(Q(title__icontains=query) | Q(description__icontains=query))
        query_parts = query.split()
        if len(query_parts) == 2:
            first_name, last_name = query_parts
            profiles = Profile.objects.filter(
                Q(user__first_name__icontains=first_name) &
                Q(user__last_name__icontains=last_name)
            )
        else:
            profiles = Profile.objects.filter(
                Q(user__username__icontains=query) |
                Q(user__first_name__icontains=query) |
                Q(user__last_name__icontains=query) |
                Q(location__icontains=query)
            )

        video_serializer = BaseVideoSerializer(videos, many=True)
        profile_serializer = ProfileSerializer(profiles, many=True)
        return Response({'videos': video_serializer.data, 'profiles': profile_serializer.data})


class SearchQueryViewSet(ModelViewSet):
    queryset = UserSearch.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SearchSerializer
    authentication_classes = [JWTAuthentication]
    allowed_methods = ['POST']

    def create(self, request, *args, **kwargs):
        data_copy = request.data.copy()
        data_copy["user"] = request.user.pk
        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)




