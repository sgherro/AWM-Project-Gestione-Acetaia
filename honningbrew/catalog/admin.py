from django.contrib import admin

# Register your models here.

from .models import Barrel, Set
admin.site.register(Barrel)
admin.site.register(Set)