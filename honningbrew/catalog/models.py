from django.db import models


class Set(models.Model):
    name = models.CharField(max_length=3)
    
    def __str__(self):
        return self.name

class Barrel(models.Model):
    type_wood = models.CharField(max_length=20)
    capacity = models.IntegerField(default=0)
    battery = models.ForeignKey(Set,on_delete=models.CASCADE)
