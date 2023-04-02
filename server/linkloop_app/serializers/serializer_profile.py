import requests
from django.db.models import Sum
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from ..models import Profile, ProfileImpression


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    def validate(self, attrs):
        profile_picture = attrs.get('profile_picture', None)
        if profile_picture:
            try:
                response = requests.get(url=profile_picture)
                if response.status_code != 200:
                    raise Exception('Profile picture not found')
                file_size = int(response.headers.get('Content-Length', 0))
                if file_size > 1024 * 1024:
                    raise ValidationError({"profile_picture": "Profile Picture must be under 1MB."})
            except Exception as error:
                raise ValidationError(str(error))
        return attrs

    def create(self, validated_data):
        profile = Profile.objects.create(
            user=validated_data['user'],
            profile_name=validated_data.get('profile_name'),
            profile_picture=validated_data.get('profile_picture'),
            location=validated_data.get('location'),
            rating=validated_data.get('rating'),
            website=validated_data.get('website'),
            date_of_birth=validated_data.get('date_of_birth'),
        )
        return profile


class ProfileImpressionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileImpression
        fields = '__all__'

    def create(self, validated_data):
        viewer = validated_data.get('viewer')
        if viewer is None:
            viewed_user = validated_data.get('viewed')
            anonymous_views = \
                ProfileImpression.objects.filter(viewer=None, viewed=viewed_user).aggregate(Sum('anonymous_views'))[
                    'anonymous_views__sum'] or 0
            anonymous_views += 1
            profile_view = ProfileImpression.objects.create(
                anonymous_views=anonymous_views,
                viewed=viewed_user
            )
        else:
            profile_view = ProfileImpression.objects.create(
                viewer=viewer,
                viewed=validated_data.get('viewed')
            )
        return profile_view
