from rest_framework import serializers
from Utilisateur.models import Utilisateur
from Niveau.models import Niveau
from Option.models import Option
from Classe.models import Classe
from Role.models import Role
from Competence.models import Competence
from Module.models import Module
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token




#Role
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

#Utilisateur 

class CustomUserSerializer(serializers.ModelSerializer):
    grade = serializers.SerializerMethodField()

    class Meta:
        model = Utilisateur
        fields = ['id','username', 'nom_utilisateur', 'prenom_utilisateur', 'email','password', 'photo_de_profil', 'numero_de_telephone', 'grade']


    def get_grade(self, user):
        # Serialize the 'grade' field to a list of role names
        grade_list = list(user.grade.values_list('nom', flat=True))
        if len(grade_list) > 1:
            return ', '.join(grade_list)
        elif len(grade_list) == 1:
            return grade_list[0]
        else:
            return ''
        

class CustomUserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =  '__all__'

"""
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = '__all__'

    def create(self, validated_data):
        grade_data = validated_data.pop('grade')
        is_superuser = any(role.id == 2 for role in grade_data)
        validated_data['is_superuser'] = is_superuser
        is_staff = any(role.id == 2 for role in grade_data)
        validated_data['is_staff'] = is_staff

        validated_data.pop('groups', None)  # Remove the 'groups' field if present
        validated_data.pop('user_permissions', None)  # Remove the 'user_permissions' field if present

        user = Utilisateur.objects.create(**validated_data)
        user.grade.set(grade_data)  # Set the ManyToMany relationship
        return user
"""

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = '__all__'

    def create(self, validated_data):
        grade_data = validated_data.pop('grade')
        is_superuser = any(role.id == 2 for role in grade_data)

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['prenom_utilisateur'],
            last_name=validated_data['nom_utilisateur'],
            is_superuser=is_superuser,
            is_staff=is_superuser  # Définir is_staff en fonction de la valeur de is_superuser
        )
        validated_data['is_superuser'] = is_superuser

        validated_data.pop('groups', None)  # Supprimer le champ "groupes" s'il est présent
        validated_data.pop('user_permissions', None)  # Supprimer le champ 'user_permissions' s'il est présent

        # Créer l'instance d'utilisateur personnalisée et la lier à l'utilisateur Django
        utilisateur = Utilisateur.objects.create(**validated_data)
        utilisateur.user_ptr = user
        utilisateur.save()

        utilisateur.grade.set(grade_data)  # Définir la relation ManyToMany
        return utilisateur

""""
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        print("Input email:", email)
        print("Input password:", password)

        try:
            user = Utilisateur.objects.get(email=email, password=password)
            data['user'] = user
        except Utilisateur.DoesNotExist:
            raise ValidationError('Informations d identification non valides. Veuillez vérifier votre courriel et votre mot de passe.')

        return data
"""

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)

            if user:
                if not user.is_active:
                    raise serializers.ValidationError("User is inactive.")
                data['user'] = user
            else:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must include 'username' and 'password'.")

        return data



# Option
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'

# Niveau 
class NiveauSerializer(serializers.ModelSerializer):
    class Meta:
        model = Niveau
        fields = '__all__'

# Classe
class ClasseSerializer(serializers.ModelSerializer):
    niveau = serializers.PrimaryKeyRelatedField(queryset=Niveau.objects.all())
    option = serializers.PrimaryKeyRelatedField(queryset=Option.objects.all(), required=False)

    class Meta:
        model = Classe
        fields = ['id' , 'niveau' , 'option']


# Competence
class CompetenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competence
        fields = '__all__'
 

#Module
class ModuleSerializer(serializers.ModelSerializer):

    competences_list = CompetenceSerializer(source='competences', many=True, read_only=True)
    responsable_module_info = CustomUserSerializer(source='responsable_module', read_only=True)

    competences = serializers.SerializerMethodField()
    responsable_module = serializers.SerializerMethodField()

    class Meta:
        model = Module
        fields = '__all__'

    def get_competences(self, module):
        
        competences = list(module.competences.values_list('nom', flat=True))

        if len(competences) > 1:
            return ', '.join(competences)
        elif len(competences) == 1:
            return competences[0]
        else:
            return ''
    
    def get_responsable_module(self, module):
        return module.responsable_module.username







       
