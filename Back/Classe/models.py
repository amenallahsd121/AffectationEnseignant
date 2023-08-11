from django.db import models
from django.dispatch import receiver
from Niveau.models import Niveau
from django.db.models.signals import post_save, pre_save,post_delete
from Option.models import Option  

class Classe(models.Model):
    nom = models.CharField(max_length=50, null=True)
    niveau = models.ForeignKey(Niveau, on_delete=models.CASCADE, null=False, blank=False)
    option = models.ForeignKey(Option, on_delete=models.CASCADE, null=True, blank=True)  

    def __str__(self):
        return f"Classe: {self.nom}"



@receiver(post_save, sender=Niveau)
def create_classes_without_option(sender, instance, created, **kwargs):
    if created and instance.nom not in ["4", "5"]:
        for i in range(instance.nombreclasse):
            num_classe = Classe.objects.filter(niveau=instance).count() + 1
            nom = f"{instance.nom}{num_classe}"
            Classe.objects.create(niveau=instance, nom=nom)

@receiver(post_delete, sender=Classe)
def update_niveau_nombreclasse_on_delete(sender, instance, **kwargs):
    instance.niveau.nombreclasse = Classe.objects.filter(niveau=instance.niveau).count()
    instance.niveau.save()



@receiver(post_save, sender=Classe)
def update_niveau_nombreclasse_on_create(sender, instance, created, **kwargs):
    if created:
        # Disconnect the update_classes function
        pre_save.disconnect(update_classes, sender=Niveau)
        
        instance.niveau.nombreclasse = Classe.objects.filter(niveau=instance.niveau).count()
        instance.niveau.save()
        
        # Reconnect the update_classes function
        pre_save.connect(update_classes, sender=Niveau)

# ///////////////////////////////////////////////////////////////////////////





def update_classes(sender, instance, **kwargs):
    if instance.nom not in ["4", "5"]:
        try:
            old_instance = Niveau.objects.get(pk=instance.pk)
            if old_instance.nombreclasse != instance.nombreclasse:
                Classe.objects.filter(niveau=instance).delete() 
                for i in range(instance.nombreclasse):
                    num_classe = Classe.objects.filter(niveau=instance).count() + 1
                    nom = f"{instance.nom}{num_classe}"
                    
                    classe = Classe(niveau=instance, nom=nom)
                    classe.save()
        except Niveau.DoesNotExist:
            pass



post_save.connect(create_classes_without_option, sender=Niveau)
pre_save.connect(update_classes, sender=Niveau)






# ///////////////////////////////////////////////////////////////////////////

