# Generated by Django 4.0.1 on 2023-08-13 19:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Utilisateur', '0003_remove_utilisateur_groups_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='utilisateur',
            name='username',
            field=models.CharField(max_length=255, null=True, unique=True),
        ),
    ]
