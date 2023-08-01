from django.db import models

# Create your models here.

from django.core.validators import MaxValueValidator

class Role(models.Model):
    nom = models.CharField(max_length=255)
    description = models.TextField()
    charge_horaire = models.IntegerField(validators=[MaxValueValidator(378)], null=True, blank=True)

    def __str__(self):
        return self.nom