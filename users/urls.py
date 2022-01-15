from django.urls import path

from users.views import CreateUserView


app_name = 'users'

urlpatterns = [
    path('create', CreateUserView.as_view(), name='user_create'),
]
