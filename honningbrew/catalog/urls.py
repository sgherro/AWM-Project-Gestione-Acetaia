from django.urls import path
from . import admin, views

urlpatterns = [
    path('', views.index, name='index'),
]