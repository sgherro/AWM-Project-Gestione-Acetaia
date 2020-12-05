from rest_framework import serializers
from . import models

class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Set
        fields = '__all__'

class BarrelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Barrel
        fields = '__all__'

class RabboccoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Rabbocco
        fields = '__all__'

class AddMostoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AddMosto
        fields = '__all__'

class MisurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Misuration
        fields = '__all__'

class TasteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Taste
        fields = '__all__'

class OperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Operation
        fields = '__all__'

       


