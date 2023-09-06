from django.db import models
from Utilisateur.models import Utilisateur
from Module.models import Module


# Create your models here.


class Affectation(models.Model):
    Utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, null=False, blank=False)
    Module = models.ForeignKey(Module, on_delete=models.CASCADE, null=True, blank=True)  
    
    def __str__(self):
        return self.Utilisateur.prenom_utilisateur