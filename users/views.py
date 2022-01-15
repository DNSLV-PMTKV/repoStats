import re

from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from users.models import User
from users.serializers import CreateUserSerializer

EMAIL_RE = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,5}$'


def create_base64_token(content: str) -> str:
    return urlsafe_base64_encode(bytes(content, 'utf-8'))


class CreateUserView(CreateAPIView):
    """ Registration view """

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
