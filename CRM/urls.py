from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_view),
    path('income-view/', views.income_view),
    path('monthly-target-order/', views.monthly_target_order_view),
    path('profit/', views.profit_view),

]
