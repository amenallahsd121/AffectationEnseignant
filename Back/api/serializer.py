from rest_framework import serializers
from Niveau.models import Niveau
from Classe.models import Classe
from Conges.models import Conges



class NiveauSerializer(serializers.ModelSerializer):

    class Meta:
        model = Niveau
        fields = '__all__'

class ClasseSerializer(serializers.ModelSerializer):
    niveau_nom = serializers.ReadOnlyField(source='niveau.nom') 
    
    class Meta:
        model = Classe
        fields = '__all__'

class CongesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Conges
        fields = '__all__'

