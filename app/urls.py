from django.urls import path

from app.views import CreateUserView, CreateRepositoryView, ListRepositoryView, DetailRepositoryView, DeleteRepositoryView


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
]
