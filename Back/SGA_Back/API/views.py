from rest_framework.response import Response
from Utilisateur.models import Utilisateur
from rest_framework.decorators import api_view , permission_classes , authentication_classes
from .serializers import *
from django.contrib.auth import  login, logout
from rest_framework.response import Response
from rest_framework import permissions, status
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.utils import timezone



@api_view(["POST"])
def register_user_api_view(request):
    if request.method == "POST":
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Utilisateur enregistré avec succès."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def user_login(request):
    data = request.data
    serializer = UserLoginSerializer(data=data)
    serializer.is_valid(raise_exception=True)

    user = serializer.validated_data['user']
    login(request, user)

    # Mise à jour du champ last_login du modèle Django User
    django_user = User.objects.get(username=user.username)
    django_user.last_login = timezone.now()
    django_user.save()

    # Sérialiser le champ 'grade' en une liste de noms de rôles
    grade_list = list(user.grade.values_list('nom', flat=True))

    # Stocker les informations de l'utilisateur dans la session
    request.session['logged_in_user'] = {
        'id': user.id,
        'username': user.username,
        'nom_utilisateur': user.nom_utilisateur,
        'prenom_utilisateur': user.prenom_utilisateur,
        'email': user.email,
        'numero_de_telephone': user.numero_de_telephone,
        'grade': grade_list,
    }

    response = {"message": "Connexion avec succès!", "data": serializer.data}
    return Response(data=response, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
@authentication_classes([])
def user_logout(request):
    if 'logged_in_user' in request.session:
        session_data = request.session['logged_in_user']
        logout(request)
    else:
        session_data = None

    return Response({
        'message': "Déconnexion réussie!",
        'session_data': session_data,  # Renvoyer les données de la session dans la réponse
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
@authentication_classes([])
def get_logged_in_user_info(request):
 # Vérifier si l'utilisateur est connecté
    if 'logged_in_user' in request.session:
        session_data = request.session['logged_in_user']
        user_id = session_data['id']

        # Récupérer les informations de l'utilisateur connecté à partir des données de session définies lors de la connexion
        if user_id:
            try:
                utilisateur = Utilisateur.objects.get(id=user_id)
                serializer = CustomUserSerializer(utilisateur)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Utilisateur.DoesNotExist:
                return Response({"message": "Utilisateur non trouvé."}, status=status.HTTP_404_NOT_FOUND)

    return Response({"message": "Utilisateur non connecté."}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def list_users(request):
    utilisateur = Utilisateur.objects.all()
    serializer = CustomUserSerializer(utilisateur, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
def update_user(request, id=None):
    utilisateur = get_object_or_404(Utilisateur, id=id)

    serializer = RegisterSerializer(instance=utilisateur, data=request.data)
    if serializer.is_valid():
        # Mettre à jour les données relatives au grade
        grade_data = serializer.validated_data.pop('grade')
        is_superuser = any(role.id == 2 for role in grade_data)

        try:
            user = User.objects.get(username=utilisateur.username)
            user.username = serializer.validated_data['username']
            user.email = serializer.validated_data['email']
            user.is_superuser = is_superuser
            user.is_staff = is_superuser
            user.save()
        except User.DoesNotExist:
            pass  

        
        serializer.validated_data['is_superuser'] = is_superuser
        serializer.save()

        utilisateur.grade.set(grade_data)  
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_user(request, id=None):
    try:
        utilisateur = Utilisateur.objects.get(id=id)
        utilisateur.delete()
        return Response("Utilisateur supprimé avec succès!")
    except Utilisateur.DoesNotExist:
        return Response("Utilisateur non trouvé.", status=status.HTTP_404_NOT_FOUND)

    