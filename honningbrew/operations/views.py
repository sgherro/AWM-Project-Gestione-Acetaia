from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from .forms import *
from rest_framework import generics, status
from . import serializers
from rest_framework.response import *
from rest_framework.views import APIView

OPERATIONS_SERIALIZERS_SWICTH = {
    "Aggiunta mosto" : serializers.AddMostoSerializer,
    "Misurazione" : serializers.MisurationSerializer,
    "Degustazione" : serializers.TasteSerializer,
    "Rabbocco" : serializers.RabboccoSerializer,
    "Prelievo" : serializers.OperationSerializer
}
OPERATIONS_MODELS_SWICTH = {
    "Aggiunta mosto" : AddMosto,
    "Misurazione" : Misuration,
    "Degustazione" : Taste,
    "Rabbocco" : Rabbocco,
    "Prelievo" : Operation
}

# visualizza la lista delle batterie
class SetList(APIView):
    
    def get(self,request,format=None):
        queryset = Set.objects.all()
        ser = serializers.SetSerializer(queryset, many=True)
        return Response(ser.data)


#dettagli di una batteria
class SetDetails(APIView):

    # visualizzazione di lista di barili dentro la stessa batteria    
    def get(self, request, name, format=None):
        queryset = Barrel.objects.filter(battery__name=name)
        ser = serializers.BarrelSerializer(queryset, many=True)
        return Response(ser.data)

    # aggiunta di un nuovo barrel
    def post(self, request, name, format=None):
        ser = serializers.BarrelSerializer(data=request.data)
        if ser.is_valid():
            
            count = Barrel.objects.filter(battery__name=name).count()

            ser_instance = ser.save()
            ser_instance.pos = count +1
            ser_instance.save()
            
            return Response(ser.data, status=status.HTTP_201_CREATED)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

class BarrelDetails(APIView):

    # dettagli di un barile dentro ad una batteria, data dalla posizione del barile 
    # nella batteria e dal nome della batteria
    def get(self, request, barrel_pos, set_name, format=None):
            queryset = Barrel.objects.filter(battery__name=set_name).filter(pos=barrel_pos)
            ser = serializers.BarrelSerializer(queryset, many=True)
            return Response(ser.data)

    # modifica di un barrel, specificando nella richiesta POST la capacità e/o 
    # tipo di legno
    def post(self, request, barrel_pos, set_name, format=None):
            try:
                bar_instance = Barrel.objects.filter(battery__name=set_name, pos=barrel_pos)
                if('capacity' in request.data):
                    bar_instance.update(capacity = request.data['capacity'])
                if('type_wood' in request.data): 
                    bar_instance.update(type_wood = request.data['type_wood'])

                ser = serializers.BarrelSerializer(bar_instance, many=True)    
                return Response(ser.data)
            except Exception:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            
            
    # elimina il barile nella posizione e nel set indicato        
    def delete(self, request, barrel_pos, set_name, format=None):
        
        ret = Barrel.objects.filter(battery__name=set_name, pos=barrel_pos).delete()
        return Response(ret, status=status.HTTP_204_NO_CONTENT)

class OpsList(APIView):

    # lista di operazioni per nome della batteria
    def get(self, request, set_name, format = None):
        try:
            queryset = Operation.objects.filter(barrel__battery__name=set_name)
            ser = serializers.OperationSerializer(queryset, many=True)
    
            return Response(ser.data)

        except:
            return Response("Errore nei parametri")

    # aggiunta di una nuova operazione generica, si può mettere solo il 
    # nome per differenziare il tipo di operazione, il prelievo è quella base.
    # si differenzia il tipo di serializzatore in base al nome inserito, che per evitare 
    # problemi dovrebbe essere un TextChoice
   
    def post(self, request, set_name, format=None):
        type_ops = request.data['name']
        ser = OPERATIONS_SERIALIZERS_SWICTH[type_ops](data=request.data)
        if ser.is_valid():  
            ser.save()
            return Response(ser.data, status = status.HTTP_201_CREATED)
        return Response(ser.errors, status = status.HTTP_400_BAD_REQUEST) 
   
    """
    def post(self, request, set_name, format=None):
        ser = serializers.OperationSerializer(data=request.data)
        if ser.is_valid():  
            ser.save()
            return Response(ser.data, status = status.HTTP_201_CREATED)
        return Response(ser.errors, status = status.HTTP_400_BAD_REQUEST)
"""
class OpsDetails(APIView):
    def get(self, request, set_name, ops_id, format = None):
        
        try:
            
            queryset = Operation.objects.filter(barrel__battery__name=set_name, id = ops_id)
            type_ops = queryset[0].name
            queryset_istance = OPERATIONS_MODELS_SWICTH[type_ops].objects.filter(pk=ops_id)
            ser = OPERATIONS_SERIALIZERS_SWICTH[type_ops](queryset_istance, many=True)
            return Response(ser.data)
        except:
            return Response(None)

#TODO: implementare le altre views 