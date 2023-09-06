
from django.db import models
from Role.models import Role


def user_profile_image_upload_path(instance, filename):
    return f"Photo_De_Profil/{filename}"




class Utilisateur(models.Model):
    username = models.CharField(max_length=255, unique=True,null=True)
    nom_utilisateur = models.CharField(max_length=255)
    prenom_utilisateur = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=20)  
    photo_de_profil = models.ImageField(upload_to=user_profile_image_upload_path, blank=True, null=True)
    numero_de_telephone = models.CharField(max_length=8, null=True, blank=True)
    grade = models.ManyToManyField(Role)


    def __str__(self):
        return self.username
    
    
