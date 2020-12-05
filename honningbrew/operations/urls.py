from django.urls import path
from . import views

app_name = "api/v1/"

"""




"""

urlpatterns = [
    # / root 
    path('<str:set_name>/ops/<int:ops_id>', views.OpsDetails.as_view()),
    path('<str:set_name>/ops', views.OpsList.as_view()),
    path('<str:set_name>/<int:barrel_pos>/', views.BarrelDetails.as_view()),
    path('<str:name>/', views.SetDetails.as_view()),
    path('',views.SetList.as_view()),
]