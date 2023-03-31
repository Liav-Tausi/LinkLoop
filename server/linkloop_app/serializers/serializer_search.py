from rest_framework import serializers

from linkloop_app.models import UserSearch




class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSearch
        fields = '__all__'

    def create(self, validated_data):
        user_search = UserSearch.objects.create(
            user=validated_data.get('user'),
            search_query=validated_data.get('search_query'),
        )
        return user_search

