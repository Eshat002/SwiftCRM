from django.shortcuts import render
from .models import Customer
from django.http import JsonResponse
from django.core.paginator import Paginator

def customers(request):
    customers =  Customer.objects.all()

    # Number of items per page
    items_per_page = 4

    paginator = Paginator(customers, items_per_page)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    data = []

    for customer in page_obj:
        customer_data = {
            "name": f"{customer.first_name} {customer.last_name}",
            "email": customer.email,
            "total_spent": format(customer.total_spent, ".2f")
        }
        data.append(customer_data)

    # Build pagination metadata
    next_page = page_obj.next_page_number() if page_obj.has_next() else None
    previous_page = page_obj.previous_page_number() if page_obj.has_previous() else None

    return JsonResponse({
        "data": data,
        "next_page": next_page,
        "previous_page": previous_page,
        "total_pages": paginator.num_pages
    })

