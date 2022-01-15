from django.contrib.auth import get_user_model
from rest_framework import serializers


class CreateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'token']
        read_only_fields = ['id', 'token']
