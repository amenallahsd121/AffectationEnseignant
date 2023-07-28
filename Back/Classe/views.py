from django.shortcuts import render
from .models import Classe
from django.views.generic import ListView

# Create your views here.


def listClasse(req):
    classes = Classe.objects.all()

    return render(req, 'classe.html', {'classes': classes})


class ListClasse(ListView):

    model = Classe
    template_name = "classe.html"

