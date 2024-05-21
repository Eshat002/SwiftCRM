from django.urls import path
from . import views

urlpatterns = [
    path('', views.analytics_view),
    path('sales-analytics/', views.sales_analytics),
    
]
