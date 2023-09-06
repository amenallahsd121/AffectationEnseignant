from django.db import models

# Create your models here.
class Configuration(models.Model):
    Année_Universitaire = models.IntegerField(null=True)
    Archive = models.CharField(max_length=20,null=True)
    DD_Annee = models.DateField(null=True) 
    DF_Annee = models.DateField(null=True)
   

    def __str__(self):
        return f"Annee : {self.Année_Universitaire}"
