from django.forms import ModelForm
from .models import *

class BarrelForm(ModelForm):
    class Meta:
        model = Barrel
        fields = ['battery','capacity','type_wood','pos']

class SetForm(ModelForm):
    class Meta:
        model = Set
        fields = ['name']


class OperationForm(ModelForm):
    class Meta:
        model = Operation
        fields = ['datetime','barrel']

class RabboccoForms(ModelForm):
    class Meta:
        model = Rabbocco
        fields = ['datetime','barrel','quantity','barrel_destination']


class AddMostoForms(ModelForm):
    class Meta:
        model = AddMosto
        fields = ['datetime','barrel','quantity','type_mosto']


class MisurationForms(ModelForm):
    class Meta:
        model = Misuration
        fields = ['datetime','barrel','quantity','type_measure']


class TasteForms(ModelForm):
    class Meta:
        model = Taste
        fields = ['datetime','barrel','description']
