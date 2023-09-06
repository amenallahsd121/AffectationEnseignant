from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from Niveau.models import Niveau
from Classe.models import Classe
from Conges.models import Conges
from Module.models import Module
from Configuration.models import Configuration
from Affectation.models import Affectation
from Utilisateur.models import Utilisateur
from .serializer import NiveauSerializer
from .serializer import ClasseSerializer
from .serializer import CongesSerializer
from .serializer import UserSerializer
from .serializer import AffectationSerializer
from .serializer import ModuleSerializer
from .serializer import ConfigurationSerializer



# ///////////////////////////////////////////////////// Niveaux ///////////////////////////////////////////////////////////////////////////////


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

# ///////////////////////////////////////////////////// Classes ///////////////////////////////////////////////////////////////////////////////

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
        serializer.save()

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
    return Response("Classe deleted")

# ///////////////////////////////////////////////////// Conges ///////////////////////////////////////////////////////////////////////////////

@api_view(['GET'])
def getCongess(request):
    conges = Conges.objects.all()
    serializer = CongesSerializer(conges, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getConges(request,id=None):
    conges = Conges.objects.get(id=id)
    serializer = CongesSerializer(conges)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['POST'])
def addConges(request):
    serializer = CongesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def updateConges(request, id=None):
    conges = Conges.objects.get(id=id)
    serializer = CongesSerializer(instance=conges, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteConges(request, id=None):
    conges = Conges.objects.get(id=id)
    conges.delete()
    return Response("Conges deleted")



# ///////////////////////////////////////////////////// User ///////////////////////////////////////////////////////////////////////////////


@api_view(['GET'])
def getUsers(request):
    user = Utilisateur.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getUser(request,id=None):
    user = Utilisateur.objects.get(id=id)
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


# ///////////////////////////////////////////////////// Affectation ///////////////////////////////////////////////////////////////////////////////


@api_view(['GET'])
def getAffectations(request):
    affectation = Affectation.objects.all()
    serializer = AffectationSerializer(affectation, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getAffectation(request,id=None):
    affectation = Affectation.objects.get(id=id)
    serializer = AffectationSerializer(affectation)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['POST'])
def addAffectation(request):
    serializer = AffectationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def updateAffectation(request, id=None):
    affectation = Affectation.objects.get(id=id)
    serializer = AffectationSerializer(instance=affectation, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteAffectation(request, id=None):
    affectation = Affectation.objects.get(id=id)
    affectation.delete()
    return Response("Affectation deleted")

# ///////////////////////////////////////////////////// Module ///////////////////////////////////////////////////////////////////////////////

@api_view(['GET'])
def getModules(request):
    module = Module.objects.all()
    serializer = ModuleSerializer(module, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getModule(request,id=None):
    module = Module.objects.get(id=id)
    serializer = ModuleSerializer(module)
    return Response(serializer.data, status=status.HTTP_200_OK)


# ///////////////////////////////////////////////////// Configuration ///////////////////////////////////////////////////////////////////////////////


@api_view(['GET'])
def getConfigurations(request):
    configuration = Configuration.objects.all()
    serializer = ConfigurationSerializer(configuration, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getConfiguration(request,id=None):
    configuration = Configuration.objects.get(id=id)
    serializer = ConfigurationSerializer(configuration)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['POST'])
def addConfiguration(request):
    serializer = ConfigurationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def updateConfiguration(request, id=None):
    configuration = Configuration.objects.get(id=id)
    serializer = ConfigurationSerializer(instance=configuration, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteConfiguration(request, id=None):
    affectation = Configuration.objects.get(id=id)
    affectation.delete()
    return Response("Configuration deleted")