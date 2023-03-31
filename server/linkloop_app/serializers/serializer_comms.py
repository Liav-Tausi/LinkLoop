from rest_framework import serializers
from linkloop_app.models import Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

    def create(self, validated_data):
        message = Message.objects.create(
            sender=validated_data["sender"],
            receiver=validated_data["receiver"],
            title=validated_data["title"],
            description=validated_data["description"],
            message_text=validated_data["message_text"],
            location=validated_data["location"]
        )
        return message

