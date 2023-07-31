from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from Niveau.models import Niveau
from Classe.models import Classe
from .serializer import NiveauSerializer
from .serializer import ClasseSerializer


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
    return Response("Niveau deleted")