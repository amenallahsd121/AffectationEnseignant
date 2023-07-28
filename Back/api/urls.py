from django.urls import path
from .views import *

urlpatterns = [
    path('', getNiveaux),
    path('<int:id>', getNiveau),
    path('add/', addNiveau),
    path('update/<int:id>', updateNiveau),
    path('delete/<int:id>', deleteNiveau),

]
