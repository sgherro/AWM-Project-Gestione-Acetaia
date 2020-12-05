from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(Barrel)
admin.site.register(Set)
admin.site.register(AddMosto)
admin.site.register(Rabbocco)
admin.site.register(Taste)
admin.site.register(Misuration)

