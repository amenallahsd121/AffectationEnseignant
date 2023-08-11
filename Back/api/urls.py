from django.urls import path
from .views import *

urlpatterns = [
    path('', getNiveaux),
    path('<int:id>', getNiveau),
    path('add/', addNiveau),
    path('update/<int:id>', updateNiveau),
    path('delete/<int:id>', deleteNiveau),


# //////////////////////////////////////////////////////////////////

    path('classe', getClasses),
    path('classe/<int:id>', getClasse),
    path('classe/add/', addClasse),
    path('classe/update/<int:id>', updateClasse),
    path('classe/delete/<int:id>', deleteClasse),


# //////////////////////////////////////////////////////////////////

    path('congess', getCongess),
    path('conges/<int:id>', getConges),
    path('conges/add/', addConges),
    path('conges/update/<int:id>', updateConges),
    path('conges/delete/<int:id>', deleteConges),


# //////////////////////////////////////////////////////////////////



]
