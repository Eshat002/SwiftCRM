from django.shortcuts import render
from django.http import JsonResponse
import datetime
from .models import Order, TargetOrder
import calendar
from numerize import numerize 


def dashboard_view(request):
    return render(request, "dashboard.html",{})


def income_view(request):
    current_date = datetime.datetime.now()
    current_month = current_date.month
    year= current_date.year
    # print("year", current_year)

    if current_month == 1 :
        previous_month = 12 
        before_previous_month = previous_month-1
          
    elif current_month == 2 :
        previous_month = current_month - 1 
        before_previous_month = 12             
     
    else:
        previous_month= current_month - 1
        before_previous_month= previous_month-1
    
    
    current_month_name = calendar.month_name[current_month]
    previous_month_name = calendar.month_name[previous_month]
    before_previous_month_name = calendar.month_name[before_previous_month]

    sales_current_month=  Order.get_total_sales_by_month(current_month, year) 

    if previous_month == 12 :
        sales_previous_month =  Order.get_total_sales_by_month(previous_month, year-1) 

    else:
        sales_previous_month=  Order.get_total_sales_by_month(previous_month, year) 
    
    if before_previous_month == 12 or before_previous_month == 11 :        
        sales_before_previous_month =  Order.get_total_sales_by_month(before_previous_month, year-1)  

    else :
        sales_before_previous_month =  Order.get_total_sales_by_month(before_previous_month, year)  

    

    data = {
     "months_y_axis": [current_month_name, previous_month_name, before_previous_month_name],
     "income_x_axis":[sales_current_month, sales_previous_month, sales_before_previous_month]
      
    }

    if sales_previous_month != 0 :
        sales_change_in_percentage =  (sales_current_month - sales_previous_month) / sales_previous_month * 100
    
    else:
        sales_change_in_percentage = 0.0

    if sales_change_in_percentage > 0:
        increased = True
    elif sales_change_in_percentage < 0:
        increased = False
    else:
        increased = None

    data2 = {
        "sales_current_month":  format(abs(sales_current_month), ".2f"),
        "sales_change_in_percentage" : format(abs(sales_change_in_percentage), ".2f"),
        "increased":increased,
        "current_month_name":current_month_name
    }
    return JsonResponse({"data": data, "data2": data2})

 
def monthly_target_order_view(request):
    current_date = datetime.datetime.now()
    current_month = current_date.month
    current_year =current_date.year

    orders_current_month= Order.get_total_orders_by_month(current_month,current_year)

    target_orders= TargetOrder.objects.filter(target_month=current_month, target_year=current_year).first()

    if target_orders is not None: 
        monthly_target_orders = target_orders.target_value
    else:
        monthly_target_orders = 100

    if monthly_target_orders != 0:
        target_gained = (orders_current_month / monthly_target_orders) * 100
    else:
        target_gained = 0.0  # If monthly_target_orders is zero, consider target_gained as 0%


    data= {       
       "monthly_target_orders": numerize.numerize(monthly_target_orders),
       "target_gained": format(target_gained, ".0f"), 
        "orders_current_month": numerize.numerize(orders_current_month)
    }
        
    return JsonResponse({"data":data})
    

def profit_view(request):
    current_date = datetime.datetime.now()
    current_month = current_date.month
    year= current_date.year
    # print("year", current_year)

    if current_month == 1 :
        previous_month = 12         
     
    else:
        previous_month= current_month - 1
       
    current_month_name = calendar.month_name[current_month]
    previous_month_name = calendar.month_name[previous_month]
 
    sales_current_month=  Order.get_total_sales_by_month(current_month, year) 
    buying_price_current_month=  Order.get_total_buying_price_by_month(current_month, year) 

    
    if previous_month == 12 :
        sales_previous_month =  Order.get_total_sales_by_month(previous_month, year-1) 
        buying_price_previous_month =  Order.get_total_buying_price_by_month(previous_month, year-1) 

    else:
        sales_previous_month =  Order.get_total_sales_by_month(previous_month, year) 
        buying_price_previous_month = Order.get_total_buying_price_by_month(previous_month, year) 

    
    profit_current_month = sales_current_month - buying_price_current_month
    profit_previous_month = sales_previous_month - buying_price_previous_month
 
    if profit_previous_month != 0 :
        profit_change_in_percentage =  (profit_current_month - profit_previous_month) / profit_previous_month * 100
    
    else:
        profit_change_in_percentage = 0.0


    if profit_change_in_percentage > 0:
        increased = True
    elif profit_change_in_percentage < 0:
        increased = False
    else:
        increased = None


    data = {
        "profit": format(profit_current_month, ".2f"),
        "profit_percentage": format(abs(profit_change_in_percentage),".2f"),
        "increased": increased,
        "profit_y_axis":[profit_previous_month, profit_current_month],
        "months_x_axis":[previous_month_name, current_month_name]

    }

    return JsonResponse({"data": data})
     