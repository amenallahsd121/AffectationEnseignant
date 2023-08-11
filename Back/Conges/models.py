from django.db import models
from Utilisateur.models import Utilisateur

# Create your models here.
class Conges(models.Model):
    
    duree=models.IntegerField(null=True)
    type=models.CharField(max_length=20,null=True)
    datedebut=models.DateField(null=True)
    datefin=models.DateField(null=True)
    user = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, null=True, blank=False)
    


    
    def __str__(self):
         return self.type 