from django.urls import path
from . import views

urlpatterns = [
    path('sales-analytics/', views.sales_analytics),
    
]
