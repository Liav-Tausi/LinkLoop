from rest_framework import serializers
from linkloop_app.models import (
    Skill,
    Education,
    Experience,
    UserSkill,
    UserEducation,
    UserExperience
)


# ____________________skills_______________________#

class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


class SkillsUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSkill
        fields = '__all__'

    def create(self, validated_data):
        user_skill = UserSkill.objects.create(
            user=validated_data.get('user'),
            skill=validated_data.get('skill')
        )
        return user_skill


# ____________________education_______________________#


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'


class EducationUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEducation
        fields = '__all__'

    def create(self, validated_data):
        user_education = UserEducation.objects.create(
            user=validated_data.get('user'),
            education=validated_data.get('education')
        )
        return user_education


# ____________________experience_______________________#


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'


class ExperienceUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExperience
        fields = '__all__'

    def create(self, validated_data):
        user_experience = UserExperience.objects.create(
            user=validated_data.get('user'),
            experience=validated_data.get('experience')
        )
        return user_experience
