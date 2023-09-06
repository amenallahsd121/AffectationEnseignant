# Generated by Django 4.1.10 on 2023-08-06 13:32

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Role",
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
                ("nom", models.CharField(max_length=255)),
                ("description", models.TextField()),
                (
                    "charge_horaire",
                    models.IntegerField(
                        blank=True,
                        null=True,
                        validators=[django.core.validators.MaxValueValidator(378)],
                    ),
                ),
            ],
        ),
    ]
