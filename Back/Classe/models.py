from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from Niveau.models import Niveau
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

class Classe(models.Model):
    nom = models.CharField(max_length=50, null=True)
    niveau = models.ForeignKey(Niveau, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return f"Classe: {self.nom}"

def update_classes(sender, instance, **kwargs):
    try:
        old_instance = Niveau.objects.get(pk=instance.pk)
        if old_instance.nombreclasse != instance.nombreclasse:
            Classe.objects.filter(niveau=instance).delete() 
            for i in range(instance.nombreclasse):
                num_classe = i + 1
                nom = f"{instance.nom}{num_classe}"
                
                classe = Classe(niveau=instance, nom=nom)
                classe.save()
    except Niveau.DoesNotExist:
        pass

@receiver(post_save, sender=Niveau)
def create_classes(sender, instance, created, **kwargs):
    if created and instance.nombreclasse:
        for i in range(instance.nombreclasse):
            num_classe = i + 1
            nom = f"{instance.nom}{num_classe}"
            
            classe = Classe(niveau=instance, nom=nom)
            classe.save()

pre_save.connect(update_classes, sender=Niveau)
post_save.connect(create_classes, sender=Niveau)
