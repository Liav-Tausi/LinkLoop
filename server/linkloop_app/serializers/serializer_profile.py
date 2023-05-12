from rest_framework import serializers
from .serializer_user import UserSerializer
from ..models import Profile, ProfileImpression


class ProfileImpressionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileImpression
        fields = '__all__'

    def create(self, validated_data):
        profile_impression = ProfileImpression.objects.create(
            viewer=validated_data.get('viewer'),
            viewed=validated_data.get('viewed')
        )
        return profile_impression


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = '__all__'

    def create(self, validated_data):
        profile = Profile.objects.create(
            user=validated_data['user'],
            profile_picture=validated_data.get('profile_picture'),
            headline=validated_data.hget('headline'),
            about=validated_data.get('about'),
            location=validated_data.get('location'),
            rating=validated_data.get('rating'),
        )
        return profile
