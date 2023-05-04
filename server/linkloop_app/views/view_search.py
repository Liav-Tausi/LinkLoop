from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.response import Response
from ..models import Video, Profile
from ..serializers.serializer_profile import ProfileSerializer
from ..serializers.serializer_videos import BaseVideoSerializer


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
