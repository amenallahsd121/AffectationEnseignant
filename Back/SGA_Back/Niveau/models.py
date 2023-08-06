from django.db import models


class Niveau(models.Model):
    nom=models.CharField(max_length=10,null=True)
    nombreclasse=models.IntegerField(null=True)
    
    def __str__(self):
        return self.nom 