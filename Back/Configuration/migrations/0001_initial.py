# Generated by Django 4.0.1 on 2023-09-06 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Configuration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Année_Universitaire', models.IntegerField(null=True)),
                ('Archive', models.CharField(max_length=20, null=True)),
                ('DD_Annee', models.DateField(null=True)),
                ('DF_Annee', models.DateField(null=True)),
            ],
        ),
    ]
