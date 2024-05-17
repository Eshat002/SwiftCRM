from django.shortcuts import render
from django.http import JsonResponse
from datetime import datetime, timedelta
from django.db.models import F, ExpressionWrapper, Sum, DecimalField
from CRM.models import Order
from django.utils import timezone

def sales_analytics(request):
    # Calculate date ranges
    today = timezone.now().date()
    last_7_days_start = today - timedelta(days=7)
    print("last_7_days_start", last_7_days_start)
    last_7_days_end = today
    previous_7_days_start = last_7_days_start - timedelta(days=7)
    print("previous_7_days_start", previous_7_days_start)
    previous_7_days_end = last_7_days_start

    # Function to calculate total sales for the last 7 days and previous 7 days
    def calculate_total_sales():
    # Total sales for the last 7 days
        last_7_days_sales = Order.objects.filter(
            timestamp__gte=last_7_days_start,
            timestamp__lt=last_7_days_end
        ).aggregate(total_sales=ExpressionWrapper(Sum(F('quantity') * F('product__price')), output_field=DecimalField()))['total_sales'] or 0

        # Total sales for the previous 7 days
        previous_7_days_sales = Order.objects.filter(
            timestamp__gte=previous_7_days_start,
            timestamp__lt=previous_7_days_end
        ).aggregate(total_sales=ExpressionWrapper(Sum(F('quantity') * F('product__price')), output_field=DecimalField()))['total_sales'] or 0

        return last_7_days_sales, previous_7_days_sales

    # Function to compare total sales in percentage
    def compare_total_sales_percentage(last_7_days_sales, previous_7_days_sales):
        if previous_7_days_sales == 0:
            if last_7_days_sales == 0:
                return "Sales remained the same."
            else:
                return "Sales increased significantly from 0 units to a positive value."
        else:
            change = last_7_days_sales - previous_7_days_sales
            percentage_change = (change / previous_7_days_sales) * 100
            if change > 0:
                return f"Sales increased by {percentage_change:.2f}%."
            elif change < 0:
                return f"Sales decreased by {abs(percentage_change):.2f}%."
            else:
                return "Sales remained the same."

    # Calculate total sales for the last 7 days and previous 7 days
    last_7_days_sales, previous_7_days_sales = calculate_total_sales()

    # Compare total sales in percentage
    comparison_result = compare_total_sales_percentage(last_7_days_sales, previous_7_days_sales)

    # Create response data
    response_data = {
        'last_7_days_sales': last_7_days_sales,
        'previous_7_days_sales': previous_7_days_sales,
        'comparison_result': comparison_result
    }

    # Return JSON response
    return JsonResponse(response_data)