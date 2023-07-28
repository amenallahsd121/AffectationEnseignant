from django.urls import path
from .views import list, ListClasse
urlpatterns = [
    path('listClasse', list, name="classes"),
    path('Classes', ListClasse.as_view(), name="Classes")

]
