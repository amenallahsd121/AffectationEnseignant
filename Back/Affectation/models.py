from Utilisateur.models import Utilisateur
from Module.models import Module
from Configuration.models import Configuration
from django.db import models
from django.utils import timezone


class Affectation(models.Model):
    Utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, null=False, blank=False)
    Module = models.ForeignKey(Module, on_delete=models.CASCADE, null=True, blank=True)  
    Configuration = models.ForeignKey(Configuration, on_delete=models.CASCADE, null=True, blank=True)
    Semestre = models.CharField(max_length=1, null=True,blank=True)

    
   
    def save(self, *args, **kwargs):
        
        current_year = timezone.now().year

       
        if timezone.now().month >= 9:  
            academic_year = f"{current_year}/{current_year + 1}"
            # semestre = '1'
        else:
            academic_year = f"{current_year - 1}/{current_year}"
            # semestre = '2'

        
        config, created = Configuration.objects.get_or_create(Année_Universitaire=academic_year)

        
        self.Configuration = config
        # self.Semestre = semestre

        super(Affectation, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.Utilisateur.prenom_utilisateur
