from django.shortcuts import render
from .models import Niveau
from django.views.generic import ListView

# Create your views here.


def listNiveau(req):
    classes = Niveau.objects.all()
    return render(req, 'classe.html', {'classes': classes})


class ListClasse(ListView):

    model = Niveau
    template_name = "classe.html"

    
