from django.db import models
from Competence.models import Competence
from Utilisateur.models import Utilisateur

# Create your models here.
def module_fiche_upload_path(instance, filename):
    return f"Fiches_Module/{instance.nom}/{filename}"

class Module(models.Model):
    nom = models.CharField(max_length=255)
    description = models.TextField()
    heures_enseignement = models.PositiveIntegerField()
    competences = models.ManyToManyField(Competence)
    ects = models.PositiveIntegerField()
    fiche_module = models.FileField(upload_to=module_fiche_upload_path)
    enseignants_a_affecter = models.PositiveIntegerField()
    responsable_module = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='modules')

    def __str__(self):
        return self.nom
