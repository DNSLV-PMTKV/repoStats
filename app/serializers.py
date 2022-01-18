from sqlite3 import Timestamp
from django.contrib.auth import get_user_model
from rest_framework import serializers
from datetime import timedelta
from django.utils import timezone

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
        time_threshold = timezone.now() - timedelta(days=14)
        followers_queryset = RepositoryViews.objects.filter(
            repo=obj, timestamp__gt=time_threshold)
        return RepositoryViewSerializer(followers_queryset, many=True).data


class UserRepositorySerializer(serializers.ModelSerializer):
    views = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Repository
        fields = ['id', 'url', 'created_at', 'views']

    def get_views(self, obj):
        query_params = self.context['request'].query_params
        start = query_params.get('start', None)
        end = query_params.get('end', None)

        views = RepositoryViews.objects.filter(repo=obj)
        if start:
            views = views.filter(timestamp__gte=start)
        if end:
            views = views.filter(timestamp__lte=end)

        return RepositoryViewSerializer(views, many=True).data


class UserTokenValidationSerializer(serializers.Serializer):
    token = serializers.CharField()
