from django.db import models


class Option(models.Model):
    nom = models.CharField(max_length=255, unique=True)  
    nb_classes = models.IntegerField(default=0)

    def __str__(self):
        return self.nom
