from django.urls import path
from .views import list, ListClasse
urlpatterns = [
    path('list', list, name="classe"),
    path('Classes', ListClasse.as_view(), name="Classes")

]
