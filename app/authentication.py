from django.contrib.auth import get_user_model

from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication


# should this be in settings.py ?
AUTHORIZATION_HEADER = 'HTTP_X_API_TOKEN'


class CustomHeaderAuthorization(BaseAuthentication):
    """DRF TokenAuthentication that uses X-Mirror-Authorization header."""

    def authenticate(self, request):
        auth = request.META.get(AUTHORIZATION_HEADER, b'')

        if not auth:
            return None
        elif len(auth.split()) > 2:
            msg = {
                'error': 'Invalid token header. Token string should not contain spaces.'}
            raise exceptions.AuthenticationFailed(detail=msg)

        try:
            user = get_user_model().objects.get(token=auth)
        except get_user_model().DoesNotExist:
            raise exceptions.AuthenticationFailed(
                detail={'error': 'Invalid token.'})

        return (user, auth)
