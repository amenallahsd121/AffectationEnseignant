from .views import *
from django.urls import path

urlpatterns = [
    path('register', register_user_api_view, name='register'),
    path('login', user_login, name='login'),
    path('logout', user_logout, name='logout'),
    path('user-info', get_logged_in_user_info, name='user-info'),
    path('list_users', list_users, name='list_users'),
    path('update_user/<int:id>', update_user, name='update_user'),
    path('delete_user/<int:id>', delete_user, name='delete_user'),
     
]