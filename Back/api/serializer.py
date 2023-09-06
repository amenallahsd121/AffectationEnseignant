from rest_framework import serializers
from Niveau.models import Niveau
from Classe.models import Classe
from Conges.models import Conges
from Utilisateur.models import Utilisateur
from Affectation.models import Affectation
from Module.models import Module
from Configuration.models import Configuration



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
    
    nom = serializers.ReadOnlyField(source='user.nom_utilisateur')
    prenom = serializers.ReadOnlyField(source='user.prenom_utilisateur')  

    class Meta:
        model = Conges
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Utilisateur
        fields = '__all__'


class AffectationSerializer(serializers.ModelSerializer):
    nomuser = serializers.ReadOnlyField(source='Utilisateur.nom_utilisateur')
    prenomuser = serializers.ReadOnlyField(source='Utilisateur.prenom_utilisateur')
    nommodule = serializers.ReadOnlyField(source='Module.nom')  

    class Meta:
        model = Affectation
        fields = '__all__'


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'


class ConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Configuration
        fields = '__all__'
    
