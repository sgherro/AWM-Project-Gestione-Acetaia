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
# da Wikipedia https://it.wikipedia.org/wiki/Batteria_(aceto_balsamico_tradizionale)#I_legni
TYPE_WOODS = (('Rovere','Rovere'),
('Castagno','Castagno'),
('Frassino','Frassino'),
('Ginepro','Ginepro'),
('Ciliegio','Ciliegio'),
('Pero e melo','Pero e melo'),
('Robinia','Robinia'),
('Gelso','Gelso'))

OPERATIONS = ['Rabbocco','Aggiunta mosto', 'Prelievo','Misurazione','Degustazione']

class Set(models.Model):
    name = models.CharField(max_length=1,unique=True)
    
    def __str__(self):
        return self.name

class Barrel(models.Model):
    pos = models.IntegerField(default=0)
    type_wood = models.CharField(max_length = 40, choices=TYPE_WOODS)
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
    name = models.CharField(max_length=20, default=OPERATIONS[2])

class Rabbocco(Operation):
    #barrel = barrel_origin
    barrel_destination = models.ForeignKey(Barrel, on_delete=models.CASCADE)
    name = OPERATIONS[0]

    def get_type_operation(self):
        return "Rabbocco"

class AddMosto(Operation):
    type_mosto = models.CharField(max_length=20)
    name = OPERATIONS[1]

    def get_type_operation(self):
        return "Aggiunta mosto"

class Misuration(Operation):
    type_measure  = models.CharField(max_length=20)
    name = OPERATIONS[3]
    
    def get_type_operation(self):
        return "Misurazione"

class Taste(Operation):
    description = models.TextField(max_length=200)
    quantity = 0
    name = OPERATIONS[4]

    def get_type_operation(self):
        return "Degustazione"