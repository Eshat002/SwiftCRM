from django.shortcuts import render
from django.http import JsonResponse
import datetime
from .models import Order, TargetOrder, Expense
import calendar
from numerize import numerize 
from decimal import Decimal
from customer.models import Customer
from utils.utils import get_top_sold_products

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

    if sales_previous_month == 0 and sales_current_month == 0 :
        sales_change_in_percentage = 0
     
    elif sales_previous_month == 0 :
        sales_change_in_percentage = float('inf')

    else:
        sales_change_in_percentage =  (sales_current_month - sales_previous_month) / sales_previous_month * 100


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
        target_gained = 0  # If monthly_target_orders is zero, consider target_gained as 0%


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
    
    if profit_previous_month == 0 and profit_current_month == 0:
        profit_change_in_percentage = 0
    
    elif profit_previous_month == 0:
        profit_change_in_percentage = float("inf")

    else:
        profit_change_in_percentage =  (profit_current_month - profit_previous_month) / profit_previous_month * 100


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
     


def expense_view(request):

    current_date = datetime.datetime.now()
    current_month = current_date.month
    current_year= current_date.year

    if current_month == 1 :
        previous_month = 12         
     
    else:
        previous_month = current_month - 1
       
    current_month_name = calendar.month_name[current_month]
    previous_month_name = calendar.month_name[previous_month]
 
    expense_current_month_obj = Expense.objects.filter(month=current_month, year=current_year).first()
    
    if expense_current_month_obj is not None: 
        expense_current_month = expense_current_month_obj.value
    
    else:
        expense_current_month = 0


    if previous_month == 12 :
        expense_previous_month_obj = Expense.objects.filter(month=previous_month, year=current_year-1).first()
        
        if expense_previous_month_obj is not None:
            expense_previous_month = expense_previous_month_obj.value
        else:
            expense_previous_month = 0
 
    else:
        expense_previous_month_obj = Expense.objects.filter(month=previous_month, year=current_year).first()

        if expense_previous_month_obj is not None:
            expense_previous_month = expense_previous_month_obj.value
        else:
            expense_previous_month =  0
        

    if expense_previous_month == 0 and expense_current_month == 0:
        expense_change_in_percentage = 0
    
    elif expense_previous_month == 0:
        expense_change_in_percentage = float("inf")

    else:
        expense_change_in_percentage =  (expense_current_month - expense_previous_month) / expense_previous_month * 100
   
   
    if expense_change_in_percentage > 0:
        increased = True
    elif expense_change_in_percentage < 0:
        increased = False
    else:
        increased = None


    data = {
        "expense": format(expense_current_month, ".2f"),
        "expense_percentage": format(abs(expense_change_in_percentage),".2f"),
        "increased": increased,
        "expense_y_axis":[expense_previous_month, expense_current_month],
        "months_x_axis":[previous_month_name, current_month_name]

    }

    return JsonResponse({"data": data})
     

def customer_view(request):

    current_date = datetime.datetime.now()
    current_month = current_date.month
    current_year= current_date.year

    if current_month == 1 :
        previous_month = 12         
     
    else:
        previous_month = current_month - 1
       
    current_month_name = calendar.month_name[current_month]
    previous_month_name = calendar.month_name[previous_month]
 
    customer_current_month= Customer.objects.filter(timestamp__month=current_month, timestamp__year=current_year).count()
 
    if previous_month == 12:
       customer_previous_month= Customer.objects.filter(timestamp__month=previous_month, timestamp__year=current_year-1).count()
        
    else: 
       customer_previous_month= Customer.objects.filter(timestamp__month=previous_month, timestamp__year=current_year).count()


    if customer_previous_month == 0 and customer_current_month == 0:
        customer_change_in_percentage = 0
    
    elif customer_previous_month == 0:
        customer_change_in_percentage = float("inf")

    else:
        customer_change_in_percentage =  (int(customer_current_month) - int(customer_previous_month)) / int(customer_previous_month) * 100
   
   
    if customer_change_in_percentage > 0:
        increased = True
    elif customer_change_in_percentage < 0:
        increased = False
    else:
        increased = None


    data = {
        "customer_current_month": format(customer_current_month, ".0f"),
        "customer_percentage": format(abs(customer_change_in_percentage),".2f"),
        "increased": increased,
        "customer_y_axis":[customer_previous_month, customer_current_month],
        "months_x_axis":[previous_month_name, current_month_name]

    }

    return JsonResponse({"data": data})



def best_selling_products_view(request):
    best_selling_products = get_top_sold_products()
    data = []
 
    for product in best_selling_products:
        product_data = {
            "name":product.name,
            "price":product.price,
            "total_quantity": product.total_quantity_sold,
            "category":product.category.name,
            "image":product.image.url
        }
        data.append(product_data)

    return JsonResponse({"data": data})


