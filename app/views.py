import re

from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import (CreateAPIView, DestroyAPIView,
                                     ListAPIView, RetrieveAPIView)
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from app.models import Repository, User
from app.permissions import IsOwn
from app.serializers import (CreateRepositorySerializer, CreateUserSerializer,
                             DetailRepositorySerializer,
                             ListRepositorySerializer,
                             UserRepositorySerializer, UserTokenValidationSerializer)

EMAIL_RE = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,5}$'


def create_base64_token(content: str) -> str:
    return urlsafe_base64_encode(bytes(content, 'utf-8'))


class CreateUserView(CreateAPIView):
    http_method_names = ['post']
    serializer_class = CreateUserSerializer
    queryset = get_user_model().objects.all()

    def create(self, request: Request, *args, **kwargs):

        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid()

        email = serializer.data['email']

        if not re.search(EMAIL_RE, email):
            raise ValidationError(detail={'error': 'Email is not valid.'})

        user_exists = get_user_model().objects.filter(email=email).exists()

        if user_exists:
            raise ValidationError({'error': 'Email is already taken.'})

        token = create_base64_token(serializer.data['email'])
        user = User.objects.create(
            email=serializer.data['email'], token=token)
        user.save()

        return Response({"token": token}, status=status.HTTP_200_OK)


class CreateRepositoryView(CreateAPIView):
    http_method_names = ['post']
    serializer_class = CreateRepositorySerializer
    permission_classes = [IsAuthenticated, IsOwn]
    queryset = Repository.objects.all()

    def create(self, request: Request, *args, **kwargs):

        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid()

        exists = Repository.objects.filter(
            url=serializer.data['url'], user=request.user).exists()

        if exists:
            raise ValidationError(
                {'error': 'You have already added that repository.'})

        repo = Repository.objects.create(
            url=serializer.data['url'], user=request.user)
        repo.save()

        return Response({"id": repo.id}, status=status.HTTP_200_OK)


class ListRepositoryView(ListAPIView):
    http_method_names = ['get']
    permission_classes = [IsAuthenticated, IsOwn]
    serializer_class = ListRepositorySerializer

    def get_queryset(self):
        return Repository.objects.filter(user=self.request.user)


class DetailRepositoryView(RetrieveAPIView):
    lookup_field = 'id'
    http_method_names = ['get']
    permission_classes = [IsAuthenticated, IsOwn]
    serializer_class = DetailRepositorySerializer

    def get_queryset(self):
        return Repository.objects.filter(user=self.request.user)


class DeleteRepositoryView(DestroyAPIView):
    lookup_field = 'id'
    http_method_names = ['delete']
    permission_classes = [IsAuthenticated, IsOwn]
    queryset = Repository.objects.all()


class SingleUserRepositoryView(RetrieveAPIView):
    lookup_field = 'id'
    http_method_names = ['get']
    serializer_class = UserRepositorySerializer

    def get_queryset(self):
        user_token = self.kwargs.get('user_token', None)
        repository_id = self.kwargs.get('id', None)

        if not user_token:
            raise ValidationError({'error': 'No token provided'})

        user = None

        try:
            user = get_user_model().objects.get(token=user_token)
        except get_user_model().DoesNotExist:
            raise ValidationError(detail={'error': 'Invalid token.'})

        repo = Repository.objects.filter(user=user, id=repository_id)

        if not repo:
            raise ValidationError(
                {'error': 'This repository doesn\'t exist or is not corresponding to the token.'})

        return repo


class UserReposView(ListAPIView):
    http_method_names = ['get']
    serializer_class = UserRepositorySerializer

    def get_queryset(self):
        user_token = self.kwargs.get('user_token', None)

        if not user_token:
            raise ValidationError({'error': 'No token provided'})

        user = None

        try:
            user = get_user_model().objects.get(token=user_token)
        except get_user_model().DoesNotExist:
            raise ValidationError(detail={'error': 'Invalid token.'})

        return Repository.objects.filter(user=user)


class UserTokenValidationView(CreateAPIView):

    http_method_names = ['post']
    serializer_class = UserTokenValidationSerializer
    queryset = get_user_model().objects.all()

    def create(self, request: Request, *args, **kwargs):

        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid()

        token = serializer.data['token']

        user_exists = get_user_model().objects.filter(token=token).exists()

        if not user_exists:
            raise ValidationError({'error': 'Wrong token'})

        return Response({}, status=status.HTTP_200_OK)
