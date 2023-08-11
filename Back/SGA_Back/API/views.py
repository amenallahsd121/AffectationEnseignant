from rest_framework.response import Response
from Utilisateur.models import Utilisateur
from rest_framework.decorators import api_view , permission_classes , authentication_classes ,parser_classes
from .serializers import *
from django.contrib.auth import  login, logout
from rest_framework.response import Response
from rest_framework import permissions, status
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.utils import timezone


#Utilisateur

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

@api_view(['GET'])
def list_user(request,id=None):
    utilisateur = Utilisateur.objects.get(id=id)
    serializer = CustomUserSerializer(utilisateur)
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





# Option

@api_view(['GET'])
def getOptions(request):
    options = Option.objects.all()
    serializer = OptionSerializer(options, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getOption(request, id=None):
    option = Option.objects.get(id=id)
    serializer = OptionSerializer(option)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def addOption(request):
    serializer = OptionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def updateOption(request, id=None):
    option = Option.objects.get(id=id)
    serializer = OptionSerializer(instance=option, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteOption(request, id=None):
    option = Option.objects.get(id=id)
    option.delete()
    return Response("Option supprimée avec succès!")




# Niveau

@api_view(['GET'])
def getNiveaux(request):
    niveau = Niveau.objects.all()
    serializer = NiveauSerializer(niveau, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getNiveau(request,id=None):
    niveau = Niveau.objects.get(id=id)
    serializer = NiveauSerializer(niveau)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['POST'])
def addNiveau(request):
    serializer = NiveauSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
def updateNiveau(request, id=None):
    niveau = Niveau.objects.get(id=id)

    serializer = NiveauSerializer(instance=niveau, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteNiveau(request, id=None):
    niveau = Niveau.objects.get(id=id)

    niveau.delete()
    return Response("Niveau deleted")




# Classe

@api_view(['GET'])
def getClasses(request):
    classe = Classe.objects.all()
    serializer = ClasseSerializer(classe, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getClasse(request,id=None):
    classe = Classe.objects.get(id=id)
    serializer = ClasseSerializer(classe)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def addClasse(request):
    serializer = ClasseSerializer(data=request.data)
    if serializer.is_valid():
        niveau = serializer.validated_data['niveau']
        option = serializer.validated_data.get('option')

        if niveau.nom in ["4", "5"]:
            if not option:
                return Response("Option est requise pour les niveaux 4 ou 5.", status=status.HTTP_400_BAD_REQUEST)

            if option.nb_classes > niveau.nombreclasse:
                return Response("Pas assez de classes pour cette option.", status=status.HTTP_400_BAD_REQUEST)

            # Get the latest num_classe for the given option
            latest_num_classe = Classe.objects.filter(niveau=niveau, option=option).order_by('-nom').first()
            if latest_num_classe:
                latest_num = int(latest_num_classe.nom.split(option.nom)[1])
            else:
                latest_num = 0

            for i in range(option.nb_classes):
                num_classe = latest_num + i + 1
                nom_classe = f"{niveau.nom}{option.nom}{num_classe}"
                Classe.objects.create(niveau=niveau, option=option, nom=nom_classe)

            # Decrement the nombreclasse of niveau by option.nb_classes
            niveau.nombreclasse -= option.nb_classes
            niveau.save()  # Save the updated niveau

        else:
            for i in range(niveau.nombreclasse):
                num_classe = Classe.objects.filter(niveau=niveau).count() + 1
                nom = f"{niveau.nom}{num_classe}"
                Classe.objects.create(niveau=niveau, nom=nom)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
def updateClasse(request, id=None):
    classe = Classe.objects.get(id=id)
    serializer = ClasseSerializer(instance=classe, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE'])
def deleteClasse(request, id=None):
    classe = Classe.objects.get(id=id)
    classe.delete()
    return Response("Niveau deleted")






#Competence

@api_view(['GET'])
def getCompetences(request):
    competences = Competence.objects.all()
    serializer = CompetenceSerializer(competences, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getCompetence(request, id=None):
    competence = Competence.objects.get(id=id)
    serializer = CompetenceSerializer(competence)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def addCompetence(request):
    serializer = CompetenceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def updateCompetence(request, id=None):
    competence = Competence.objects.get(id=id)
    serializer = CompetenceSerializer(instance=competence, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteCompetence(request, id=None):
    competence = Competence.objects.get(id=id)
    competence.delete()
    return Response("Competence supprimée avec succès!")



#Module

@api_view(['GET'])
def getModules(request):
    modules = Module.objects.all()
    serializer = ModuleSerializer(modules, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getModule(request, id=None):
    module = Module.objects.get(id=id)
    serializer = ModuleSerializer(module)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def addModule(request):
    serializer = ModuleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def updateModule(request, id=None):
    module = Module.objects.get(id=id)
    serializer = ModuleSerializer(instance=module, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteModule(request, id=None):
    module = Module.objects.get(id=id)
    module.delete()
    return Response("Module supprimé avec succès!")
