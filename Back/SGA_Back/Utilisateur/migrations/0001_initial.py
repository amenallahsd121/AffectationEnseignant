# Generated by Django 4.1.10 on 2023-08-03 21:32

import Utilisateur.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("Role", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Utilisateur",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nom_utilisateur", models.CharField(max_length=255)),
                ("prenom_utilisateur", models.CharField(max_length=255)),
                ("email", models.EmailField(max_length=255, unique=True)),
                ("password", models.CharField(max_length=20)),
                (
                    "photo_de_profil",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to=Utilisateur.models.user_profile_image_upload_path,
                    ),
                ),
                (
                    "numero_de_telephone",
                    models.CharField(blank=True, max_length=8, null=True),
                ),
                ("grade", models.ManyToManyField(to="Role.role")),
            ],
        ),
    ]
