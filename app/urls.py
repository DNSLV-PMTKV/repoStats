from django.urls import path

from app.views import (CreateUserView, CreateRepositoryView, ListRepositoryView,
                       DetailRepositoryView, DeleteRepositoryView, SingleUserRepositoryView, UserReposView)


app_name = 'app'

# repo_details = DetailListRepositoryView.as_view(
#     {'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})
# repo_list = DetailListRepositoryView.as_view(**{'get': 'list'})

urlpatterns = [
    path('users/create', CreateUserView.as_view(), name='user_create'),
    path('repos/create', CreateRepositoryView.as_view(), name='repo_create'),
    path('repos/', ListRepositoryView.as_view(), name='repo_list'),
    path('repos/<int:id>', DetailRepositoryView.as_view(), name='repo_details'),
    path('repos/<int:id>/delete', DeleteRepositoryView.as_view(), name='repo_delete'),
    path('users/<str:user_token>/repos/<int:id>',
         SingleUserRepositoryView.as_view(), name='single_user_repo'),
    path('users/<str:user_token>/repos',
         UserReposView.as_view(), name='user_repos')
]
