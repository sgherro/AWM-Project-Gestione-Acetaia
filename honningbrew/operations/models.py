from django.db import models

"""
Nome della batteria (o Set) è monocarattere, in ordine alfabetico corrispondente al numero 
inserito come ID univoco.
name    pk
A   ->  1
B   ->  2
C   ->  3
...
"""

OPERATIONS = ['Rabbocco','Aggiunta mosto', 'Prelievo','Misurazione','Degustazione']

class Set(models.Model):
    name = models.CharField(max_length=1,unique=True)
    
    def __str__(self):
        return self.name

#TODO: type_wood = models.TextChoices(..vari tipi di legno ..) 
#TODO: textchoice anche per le operazioni, IMPORTANTE

class Barrel(models.Model):
    pos = models.IntegerField(default=0)
    type_wood = models.CharField(max_length=20)
    capacity = models.IntegerField(default=0)
    battery = models.ForeignKey(Set,on_delete=models.CASCADE)

"""
# operazione base è il prelievo, perchè non ha altri campi in più rispetto 
# all'operazione base oltre alla quantità, pertanto si differenzia dalle altre 
# le operazioni si differenziano quindi dall'attributo name, che di default è "Prelievo"

    Operazione base (Prelievo)   |   Operazione Dettagliata (Rabbocco, Misurazione, etc..)
    PADRE                        |   FIGLIO
    Attributi base presenti      |   Attributi della classe padre e attributi aggiuntivi
    
"""
class Operation(models.Model):
    datetime = models.DateTimeField()
    barrel = models.ForeignKey(Barrel, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)
    name = models.CharField(max_length=20, default='Prelievo')

class Rabbocco(Operation):
    #barrel = barrel_origin
    barrel_destination = models.ForeignKey(Barrel, on_delete=models.CASCADE)
    name = 'Rabbocco'

    def get_type_operation(self):
        return "Rabbocco"

class AddMosto(Operation):
    type_mosto = models.CharField(max_length=20)
    name = 'Aggiunta mosto'

    def get_type_operation(self):
        return "Aggiunta mosto o aceto"

class Misuration(Operation):
    type_measure  = models.CharField(max_length=20)
    name = 'Misurazione'
    
    def get_type_operation(self):
        return "Misurazione"

class Taste(Operation):
    description = models.TextField(max_length=200)
    quantity = 0
    name = OPERATIONS[4]

    def get_type_operation(self):
        return "Degustazione"