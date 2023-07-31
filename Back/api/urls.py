from django.urls import path
from .views import *

urlpatterns = [
    path('', getNiveaux),
    path('<int:id>', getNiveau),
    path('add/', addNiveau),
    path('update/<int:id>', updateNiveau),
    path('delete/<int:id>', deleteNiveau),

    path('classe', getClasses),
    path('classe/<int:id>', getClasse),
    path('classe/add/', getClasse),
    path('classe/update/<int:id>', updateClasse),
    path('classe/delete/<int:id>', deleteClasse),



]
