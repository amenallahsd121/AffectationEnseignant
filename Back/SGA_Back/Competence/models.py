from django.db import models

class Competence(models.Model):
    nom = models.CharField(max_length=255,unique=True)
    description = models.TextField()

    def __str__(self):
        return self.nom