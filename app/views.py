import re

from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, DestroyAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from app.models import RepositoryViews, User, Repository
from app.serializers import CreateUserSerializer, CreateRepositorySerializer, ListRepositorySerializer, DetailRepositorySerializer
from app.permissions import IsOwn

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
    queryset = Repository.objects.all()


class DetailRepositoryView(RetrieveAPIView):
    lookup_field = 'id'
    http_method_names = ['get']
    permission_classes = [IsAuthenticated, IsOwn]
    serializer_class = DetailRepositorySerializer
    queryset = Repository.objects.all()


class DeleteRepositoryView(DestroyAPIView):
    lookup_field = 'id'
    http_method_names = ['delete']
    permission_classes = [IsAuthenticated, IsOwn]
    queryset = Repository.objects.all()
