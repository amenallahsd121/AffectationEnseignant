from rest_framework.response import Response
from Utilisateur.models import Utilisateur
from rest_framework.decorators import api_view , permission_classes
from .serializers import *

from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics


from django.contrib.auth import  login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404



class RegisterUserAPIView(generics.CreateAPIView):
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        login(request, user)

        return Response("Connexion réussie !", status=status.HTTP_200_OK)



class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response("Déconnexion réussie !",status=status.HTTP_200_OK)

"""
@api_view(['GET'])
def get_logged_in_user_info(request):
    serializer = LoggedInUserSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)
"""

@api_view(['GET'])
def list_users(request):
    utilisateur = Utilisateur.objects.all()
    serializer = CustomUserSerializer(utilisateur, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
def update_user(request, id=None):
    utilisateur = get_object_or_404(Utilisateur, id=id)

    serializer = CustomUserSerializer(instance=utilisateur, data=request.data)
    if serializer.is_valid():
        # Check if the grade is set to 2, and if yes set is_superuser to True
        grade_data = serializer.validated_data.get('grade')
        is_superuser = any(role.id == 2 for role in grade_data)
        if is_superuser:
            serializer.validated_data['is_superuser'] = True

        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_user(request, id=None):
    utilisateur = Utilisateur.objects.get(id=id)

    utilisateur.delete()
    return Response("Utilisateur supprimer avec succés!")
    