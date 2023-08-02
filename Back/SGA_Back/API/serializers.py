from rest_framework import serializers
from Utilisateur.models import Utilisateur
from Role.models import Role
from django.contrib.auth import authenticate
from rest_framework.exceptions import ValidationError


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = ('id', 'username', 'nom_utilisateur', 'prenom_utilisateur', 'email', 'password', 'photo_de_profil', 'numero_de_telephone', 'grade')
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

from django.contrib.auth.models import User

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
            is_superuser=is_superuser,
            is_staff=is_superuser  # Set is_staff based on is_superuser value
        )
        validated_data['is_superuser'] = is_superuser

        validated_data.pop('groups', None)  # Remove the 'groups' field if present
        validated_data.pop('user_permissions', None)  # Remove the 'user_permissions' field if present

        # Create the custom user instance and link to the Django User
        utilisateur = Utilisateur.objects.create(**validated_data)
        utilisateur.user_ptr = user
        utilisateur.save()

        utilisateur.grade.set(grade_data)  # Set the ManyToMany relationship
        return utilisateur


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







       
