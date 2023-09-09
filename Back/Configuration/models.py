from django.db import models

# Create your models here.
class Configuration(models.Model):
    Année_Universitaire = models.CharField(max_length=50, null=True)
  

    ARCHIVE_CHOICES = (
        ('Archivée', 'Archivée'),
        ('Non Archivée', 'Non Archivée'),
        )

    Archive = models.CharField(
        max_length=20,
        choices=ARCHIVE_CHOICES,
        null=True,
        default=None  
    )

    DD_Annee = models.DateField(null=True) 
    DF_Annee = models.DateField(null=True)
   

    def __str__(self):
        return f"Annee : {self.Année_Universitaire}"
