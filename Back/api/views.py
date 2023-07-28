from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from Niveau.models import Niveau
from .serializer import NiveauSerializer


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
