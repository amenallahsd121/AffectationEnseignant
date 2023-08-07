from django.db import models
from Utilisateur.models import Utilisateur

# Create your models here.
class Conges(models.Model):
    
    duree=models.IntegerField(null=True)
    type=models.CharField(max_length=20,null=True)
    datedebut=models.DateField(null=True)
    datefin=models.DateField(null=True)
    # Utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, null=False, blank=False,default=1)
    user = models.ManyToManyField(Utilisateur)


    
    def __str__(self):
         return self.type 