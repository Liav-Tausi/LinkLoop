from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        exclude = ['password',]


class SignUpUserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, required=True, allow_null=False, allow_blank=False)
    confirm_password = serializers.CharField(write_only=True, required=True, allow_null=False, allow_blank=False)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 'is_staff', 'confirm_password']

        extra_kwargs = {
            "first_name": {
                "required": True,
            },
            "last_name": {
                "required": True,
            },
            "email": {
                "required": True,
                "validators": [
                    UniqueValidator(queryset=User.objects.all()),
                ],
            },
            "password": {"write_only": True, "required": True},
            "confirm_password": {"write_only": True, "required": True},
        }

    def validate(self, attrs):
        if attrs.get("password") != attrs.get("confirm_password"):
            raise ValidationError({"password": "Password Fields must match."})
        try:
            validate_password(attrs.get("password"))
        except ValidationError as error:
            raise serializers.ValidationError({"password": error})
        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(
            username=validated_data.get('email'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            email=validated_data.get('email'),
            is_staff=validated_data.get('is_staff'),
        )
        user.set_password(password)
        user.save()
        return user