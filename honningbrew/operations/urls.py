from django.urls import path
from . import views

app_name = "api/v1/"

"""
api/v1/                         Root dir (list of sets)
        set_name/               Set dir (list of barrels inside the Set)
                /ops            Ops dir (list of operations inside the Set)
                    /ops_id     Ops details 
                /barrel_pos     Barrel details
"""

urlpatterns = [
    # / root 
    path('<str:set_name>/ops/<int:ops_id>', views.OpsDetails.as_view()),
    path('<str:set_name>/ops', views.OpsList.as_view()),
    path('<str:set_name>/<int:barrel_pos>/', views.BarrelDetails.as_view()),
    path('<str:set_name>/', views.SetDetails.as_view()),
    path('',views.SetList.as_view()),
]