# FILE: portfolio_app/serializers.py
from rest_framework import serializers
from .models import (Profile, SkillCategory, Skill, Experience,
                     ExperiencePoint, Education, ContactMessage)

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'proficiency']

class SkillCategorySerializer(serializers.ModelSerializer):
    items = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ['id', 'category', 'items']

class ExperiencePointSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperiencePoint
        fields = ['id', 'text']

class ExperienceSerializer(serializers.ModelSerializer):
    points = ExperiencePointSerializer(many=True, read_only=True)
    period = serializers.ReadOnlyField()

    class Meta:
        model = Experience
        fields = ['id', 'title', 'company', 'location', 'period',
                  'is_current', 'description', 'points']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'degree', 'school', 'year', 'grade']

class ProfileSerializer(serializers.ModelSerializer):
    skills = SkillCategorySerializer(many=True, read_only=True)
    experience = ExperienceSerializer(many=True, read_only=True)
    education = EducationSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'name', 'role', 'email', 'phone',
                  'linkedin', 'github', 'about',
                  'skills', 'experience', 'education']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
