from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.db import models
from django.contrib.auth.models import User
from Role.models import Role


def user_profile_image_upload_path(instance, filename):
    return f"Photo_De_Profil/{filename}"

class CustomUserManager(BaseUserManager):
    def create_user(self, username, nom_utilisateur, prenom_utilisateur, email, password=None, photo_de_profil=None, numero_de_telephone=None, grade=None):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, nom_utilisateur=nom_utilisateur, prenom_utilisateur=prenom_utilisateur, email=email, grade=grade)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, nom_utilisateur, prenom_utilisateur, email, password, photo_de_profil=None, numero_de_telephone=None, grade=None):
        user = self.create_user(username, nom_utilisateur, prenom_utilisateur, email, password, grade=2)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user


class Utilisateur(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    nom_utilisateur = models.CharField(max_length=255)
    prenom_utilisateur = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=20)  
    photo_de_profil = models.ImageField(upload_to=user_profile_image_upload_path, blank=True, null=True)
    numero_de_telephone = models.CharField(max_length=8, null=True, blank=True)
    grade = models.ManyToManyField(Role)

    def __str__(self):
        return self.username
    
    def delete(self, *args, **kwargs):
        # Récupère l'objet Django User associé et le supprime
        try:
            user = User.objects.get(username=self.username)
            user.delete()
        except User.DoesNotExist:
            pass  # L'objet utilisateur n'existe peut-être pas

       # Supprimer l'objet Utilisateur
        super().delete(*args, **kwargs)
    
    
    # Ajouter related_name aux champs groups et user_permissions
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name='utilisateur_groups'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='utilisateur_permissions'
    )


    objects = CustomUserManager()  # Définir le gestionnaire d'utilisateurs personnalisé comme attribut d'objets

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['username','nom_utilisateur', 'prenom_utilisateur', 'email', 'password', 'grade']


