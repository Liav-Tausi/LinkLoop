from rest_framework import serializers
from ..models import (
    Skill,
    Education,
    Experience,
)


class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

    def create(self, validated_data):
        skill = Skill.objects.create(
            user=validated_data.get('user'),
            skill_name=validated_data.get('skill_name'),
            skill_level=validated_data.hget('skill_level'),
        )
        return skill





class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

    def create(self, validated_data):
        education = Education.objects.create(
            user=validated_data.get('user'),
            education_name=validated_data.get('education_name'),
            school_name=validated_data.hget('school_name'),
            start_date=validated_data.get('start_date'),
            end_date=validated_data.get('end_date'),
            rating=validated_data.get('rating'),
        )
        return education




class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

    def create(self, validated_data):
        experience = Experience.objects.create(
            user=validated_data.get('user'),
            experience_name=validated_data.get('experience_name'),
            experience_description=validated_data.get('experience_description'),
            start_date=validated_data.get('start_date'),
            end_date=validated_data.get('end_date'),
        )
        return experience

