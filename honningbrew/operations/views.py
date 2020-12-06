from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from .forms import *
from rest_framework import generics, status
from . import serializers
from rest_framework.response import *
from rest_framework.views import APIView

OPERATIONS_SERIALIZERS_SWITCH = {
    "Aggiunta mosto" : serializers.AddMostoSerializer,
    "Misurazione" : serializers.MisurationSerializer,
    "Degustazione" : serializers.TasteSerializer,
    "Rabbocco" : serializers.RabboccoSerializer,
    "Prelievo" : serializers.OperationSerializer
}
OPERATIONS_MODELS_SWITCH = {
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
    def get(self, request, set_name, format=None):
        queryset = Barrel.objects.filter(battery__name = set_name)
        ser = serializers.BarrelSerializer(queryset, many=True)
        return Response(ser.data)

    # aggiunta di un nuovo barrel
    def post(self, request, set_name, format=None):
        ser = serializers.BarrelSerializer(data=request.data)
        if ser.is_valid():
            
            count = Barrel.objects.filter(battery__name = set_name).count()

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
        ser = OPERATIONS_SERIALIZERS_SWITCH[type_ops](data=request.data)
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

    # mostra dettagli operazione dato nome della batteria e id dell'operazione, volendo basta anche solo l'id
    def get(self, request, set_name, ops_id, format = None):
        
        try:
            queryset = Operation.objects.filter(barrel__battery__name=set_name, id = ops_id)
            type_ops = queryset[0].name
            queryset_istance = OPERATIONS_MODELS_SWITCH[type_ops].objects.filter(pk=ops_id)
            ser = OPERATIONS_SERIALIZERS_SWITCH[type_ops](queryset_istance, many=True)
            return Response(ser.data)
        except:
            return Response(None)

    # modifica dell'operazione dato il nome (facoltativo) e id
    # si deve passare un dict con il campo da cambiare e il relativo cambio effettuato
    # non si possono modificare i valori "id" e "barrel" che rimangono fissi
    # Es:
    # Contenuto request POST: {"type_measure": "Livello etanolo"} -> {"type_measure": "Livello acido"}
    def post(self, request, set_name, ops_id, format=None):
        try:
            queryset = Operation.objects.filter(barrel__battery__name=set_name, id = ops_id)
            type_ops = queryset[0].name
            queryset_instance = OPERATIONS_MODELS_SWITCH[type_ops].objects.filter(pk=ops_id)
            if 'quantity' in request.data:
                queryset_instance.update(quantity=request.data['quantity'])
            if 'type_measure' in request.data:
                queryset_instance.update(type_measure=request.data['type_measure'])
            if 'datetime' in request.data:
                queryset_instance.update(datetime=request.data['datetime'])
            if 'type_mosto' in request.data:
                queryset_instance.update(type_mosto=request.data['type_mosto'])
            if 'barrel_destination' in request.data:
                queryset_instance.update(barrel_destination=request.data['barrel_destination'])
            if 'description' in request.data:
                queryset_instance.update(description=request.data['description'])

            ser = OPERATIONS_SERIALIZERS_SWITCH[type_ops](queryset_instance, many=True)
            return Response(ser.data)
        except:
            return Response(None)

    # elimina l'operazione conoscendo l'id dell'operazione e nome (facoltativo)
    def delete(self, request, set_name, ops_id, format=None):
        ret = Operation.objects.get(pk=ops_id).delete()
        return Response(ret, status=status.HTTP_204_NO_CONTENT)
#TODO: implementare le altre views 