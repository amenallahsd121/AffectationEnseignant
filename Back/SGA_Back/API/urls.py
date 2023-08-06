from .views import *
from django.urls import path

urlpatterns = [
    #Utilisateur
    path('register', register_user_api_view, name='register'),
    path('login', user_login, name='login'),
    path('logout', user_logout, name='logout'),
    path('user-info', get_logged_in_user_info, name='user-info'),
    path('list_users', list_users, name='list_users'),
    path('update_user/<int:id>', update_user, name='update_user'),
    path('delete_user/<int:id>', delete_user, name='delete_user'),

   # Niveaux
    path('niveaux/', getNiveaux, name='get_niveaux'),
    path('niveaux/<int:id>/', getNiveau, name='get_niveau'),
    path('niveaux/add/', addNiveau, name='add_niveau'),
    path('niveaux/update/<int:id>/', updateNiveau, name='update_niveau'),
    path('niveaux/delete/<int:id>/', deleteNiveau, name='delete_niveau'),
    
    # Options
    path('options/', getOptions, name='get_options'),
    path('options/<int:id>/', getOption, name='get_option'),
    path('options/add/', addOption, name='add_option'),
    path('options/update/<int:id>/', updateOption, name='update_option'),
    path('options/delete/<int:id>/', deleteOption, name='delete_option'),
    
    # Classes
    path('classes/', getClasses, name='get_classes'),
    path('classes/<int:id>/', getClasse, name='get_classe'),
    path('classes/add/', addClasse, name='add_classe'),
    path('classes/update/<int:id>/', updateClasse, name='update_classe'),
    path('classes/delete/<int:id>/', deleteClasse, name='delete_classe'),


]