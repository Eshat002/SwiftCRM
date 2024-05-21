from django.shortcuts import render
from django.http import JsonResponse
from datetime import datetime, timedelta, date
from django.db.models import F, ExpressionWrapper, Sum, DecimalField
from CRM.models import Order
from django.utils import timezone


def analytics_view(request):
    return render(request, "analytics.html",{})


def sales_analytics(request):
    # Calculate date ranges
    today = timezone.now().date()
    print("today", today)
    last_7_days_start = today - timedelta(days=7)
    last_7_days_end = today
    previous_7_days_start = last_7_days_start - timedelta(days=7)
    previous_7_days_end = last_7_days_start

    # Function to calculate total sales for the last 7 days and previous 7 days
    def calculate_total_sales():
        last_7_days_sales = Order.objects.filter(
            timestamp__gte=last_7_days_start,
            timestamp__lt=last_7_days_end
        ).aggregate(total_sales=ExpressionWrapper(Sum(F('quantity') * F('product__price')), output_field=DecimalField()))['total_sales'] or 0

        previous_7_days_sales = Order.objects.filter(
            timestamp__gte=previous_7_days_start,
            timestamp__lt=previous_7_days_end
        ).aggregate(total_sales=ExpressionWrapper(Sum(F('quantity') * F('product__price')), output_field=DecimalField()))['total_sales'] or 0

        return last_7_days_sales, previous_7_days_sales

    # Function to calculate daily sales for a given date range
    def calculate_daily_sales(start_date, end_date):
        daily_sales = []
        date_names = []
        current_date = start_date
        while current_date < end_date:
            next_date = current_date + timedelta(days=1)
            daily_total = Order.objects.filter(
                timestamp__gte=current_date,
                timestamp__lt=next_date
            ).aggregate(total_sales=ExpressionWrapper(Sum(F('quantity') * F('product__price')), output_field=DecimalField()))['total_sales'] or 0
            daily_sales.append(daily_total)
            date_names.append(current_date.strftime("%#d %B, %Y"))
            # date_names.append(current_date.strftime('%a'))  # Format date as 'Sun', 'Mon', etc.
            current_date = next_date
        return daily_sales, date_names

    # Function to compare total sales in percentage
    def compare_total_sales_percentage(last_7_days_sales, previous_7_days_sales):
   
        if last_7_days_sales == 0 and previous_7_days_sales == 0 :
            sales_change_in_percentage = 0
     
        elif previous_7_days_sales == 0 :
            sales_change_in_percentage = float('inf')

        else:
            sales_change_in_percentage =  (last_7_days_sales - previous_7_days_sales) / previous_7_days_sales * 100

        if sales_change_in_percentage > 0:
            increased = True
        elif sales_change_in_percentage < 0:
            increased = False
        else:
            increased = None

        return (sales_change_in_percentage, increased)

    # Calculate total sales for the last 7 days and previous 7 days
    last_7_days_sales, previous_7_days_sales = calculate_total_sales()

    # Calculate daily sales and date names for the last 7 days and previous 7 days
    last_7_days_daily_sales, last_7_days_date_names = calculate_daily_sales(last_7_days_start, last_7_days_end)
    previous_7_days_daily_sales, previous_7_days_date_names = calculate_daily_sales(previous_7_days_start, previous_7_days_end)

    # Compare total sales in percentage
    comparison_result, increased = compare_total_sales_percentage(last_7_days_sales, previous_7_days_sales)

    # Create response data
    response_data = {
        'last_7_days_sales': format(last_7_days_sales, ".2f"),
        'previous_7_days_sales': format(previous_7_days_sales, ".2f"),
        'comparison_result': format(abs(comparison_result) ,".2f"),
        'increased':increased,
        'last_7_days_daily_sales': last_7_days_daily_sales,
        'last_7_days_date_names': last_7_days_date_names,
        'previous_7_days_daily_sales': previous_7_days_daily_sales,
        'previous_7_days_date_names': previous_7_days_date_names
    }
   
    # Return JSON response
    return JsonResponse(response_data)

