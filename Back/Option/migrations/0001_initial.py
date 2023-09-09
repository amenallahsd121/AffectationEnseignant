# Generated by Django 4.1.10 on 2023-08-06 13:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Option",
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
                ("nom", models.CharField(max_length=255, unique=True)),
                ("nb_classes", models.IntegerField(default=0)),
            ],
        ),
    ]