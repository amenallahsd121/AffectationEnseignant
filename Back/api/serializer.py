from rest_framework import serializers
from Niveau.models import Niveau


class NiveauSerializer(serializers.ModelSerializer):

    class Meta:
        model = Niveau
        fields = '__all__'
