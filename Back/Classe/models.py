from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from Niveau.models import Niveau

class Classe(models.Model):
    nom = models.CharField(max_length=50, null=True)
    niveau = models.ForeignKey(Niveau, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return f"Classe: {self.nom}"

    def save(self, *args, **kwargs):
        if not self.nom:
            # Generate the 'nom' field by concatenating 'Niveau' name with the number of the 'Classe' object
            num_classe = Classe.objects.filter(niveau=self.niveau).count() + 1
            self.nom = f"{self.niveau.nom}{num_classe}"
        super(Classe, self).save(*args, **kwargs)

@receiver(post_save, sender=Niveau)
def create_classes(sender, instance, created, **kwargs):
    if created and instance.nombreclasse:
        for i in range(instance.nombreclasse):
            classe = Classe(niveau=instance)  # Create the Classe instance
            classe.save()  # Save the Classe instance to generate the 'nom' field

post_save.connect(create_classes, sender=Niveau)
