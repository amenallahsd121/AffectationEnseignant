from .views import *
from django.urls import path

urlpatterns = [
    path('register', RegisterUserAPIView.as_view(), name='register'),
    path('login', UserLogin.as_view(), name='login'),
    path('logout', UserLogout.as_view(), name='logout'),
    #path('user-info', GetLoggedInUserInfo.as_view(), name='user-info'),
    path('list_users', list_users, name='list_users'),
    path('update_user/<int:id>', update_user, name='update_user'),
    path('delete_user/<int:id>', delete_user, name='delete_user'),
     
]