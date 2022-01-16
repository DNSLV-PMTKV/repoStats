from django.contrib.auth import get_user_model
from rest_framework import serializers

from app.models import Repository, RepositoryViews


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'token']
        read_only_fields = ['id', 'token']


class CreateRepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ['id', 'url', 'user']
        read_only_fields = ['id', 'user']


class ListRepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ['id', 'url', 'created_at']


class RepositoryViewSerializer(serializers.ModelSerializer):
    class Meta:
        many = True
        model = RepositoryViews
        fields = ['timestamp', 'count', 'unique']


class DetailRepositorySerializer(serializers.ModelSerializer):
    views = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Repository
        fields = ['id', 'url', 'created_at', 'views']

    def get_views(self, obj):
        followers_queryset = RepositoryViews.objects.filter(repo=obj)
        return RepositoryViewSerializer(followers_queryset, many=True).data
