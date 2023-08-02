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
from django.contrib.auth.decorators import login_required

from django.core.serializers.json import DjangoJSONEncoder



@api_view(["POST"])
def register_user_api_view(request):
    if request.method == "POST":
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def user_login(request):
    data = request.data
    serializer = UserLoginSerializer(data=data)
    serializer.is_valid(raise_exception=True)

    user = serializer.validated_data['user']
    login(request, user)

    # Serialize the 'grade' field to a list of role names
    grade_list = list(user.grade.values_list('nom', flat=True))

    # Store the user's information in the session
    request.session['logged_in_user'] = {
        'id': user.id,
        'username': user.username,
        'nom_utilisateur': user.nom_utilisateur,
        'prenom_utilisateur': user.prenom_utilisateur,
        'email': user.email,
        'password': user.password,  # Note: Storing password in session is not recommended for security reasons.
        'numero_de_telephone': user.numero_de_telephone,
        'grade': grade_list,
    }

    response = {"message": "Login Successful", "data": serializer.data}
    return Response(data=response, status=status.HTTP_200_OK)



class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response("Déconnexion réussie !",status=status.HTTP_200_OK)


"""
class GetLoggedInUserInfo(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        # Retrieve the logged-in user's information from the session
        logged_in_user_info = request.session.get('logged_in_user')
        if logged_in_user_info:
            serializer = CustomUserSerializer(data=logged_in_user_info)
            serializer.is_valid()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({"message": "User not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
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
    