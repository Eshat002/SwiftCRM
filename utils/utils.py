from django.db.models import Sum
from CRM.models import Product

# def get_top_sold_products():
#     top_products = Product.objects.annotate(
#         total_quantity_sold=Sum('order__quantity')
#     ).order_by('-total_quantity_sold')[:5]

#     return top_products


def get_top_sold_products():
    top_products = Product.objects.annotate(
        total_quantity_sold=Sum('order__quantity')
    ).filter(total_quantity_sold__gt=0).order_by('-total_quantity_sold','-id')[:5]

    return top_products