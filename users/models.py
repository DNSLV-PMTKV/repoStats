from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.db import models


class UserManager(BaseUserManager):
    """ Custom user manager """

    def create_user(self, email, password=None, **kwargs):
        """ Creates and saves a regular user """

        if not email:
            raise ValueError('User must have an email address.')
        user: User = self.model(email=self.normalize_email(email), **kwargs)
        user.token = password
        if not password:
            user.set_unusable_password()
        else:
            user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password=None):
        """ Creates and saves a super user """

        user: User = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """ Custom user model. """

    USERNAME_FIELD = 'email'

    email = models.EmailField(max_length=255, unique=True)
    token = models.CharField(max_length=255)

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    class Meta:
        ordering = ['id']
        verbose_name_plural = 'Users'
        db_table = 'users'
