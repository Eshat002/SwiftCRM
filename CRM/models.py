from django.db import models
from customer.models import Customer
from django.db.models import Sum, F

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=155)    
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    image = models.ImageField(default='products/product_default.jpg', upload_to='products/', null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} - {self.price}" 
    
class Order(models.Model):    
    product = models.ForeignKey(Product, null=True, blank=False, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, related_name='orders', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    timestamp = models.DateTimeField(auto_now_add=False)
    
    
    @classmethod
    def get_total_sales_by_month(cls, month, year):
        # Filter orders for the specified month
        orders_for_month = Order.objects.filter(timestamp__month=month, timestamp__year=year)
        total_sales_for_month = 0
     
        # Calculate total sales for the month
        for order in orders_for_month:
            order_total_amount = order.product.price * order.quantity
            total_sales_for_month += order_total_amount

        return total_sales_for_month
    
    def __str__(self):
        return str(self.timestamp)


MONTH_CHOICES = [
    (1, 'January'),
    (2, 'February'),
    (3, 'March'),
    (4, 'April'),
    (5, 'May'),
    (6, 'June'),
    (7, 'July'),
    (8, 'August'),
    (9, 'September'),
    (10, 'October'),
    (11, 'November'),
    (12, 'December'),
]
 

class TargetOrder(models.Model):
    target_month = models.IntegerField(choices=MONTH_CHOICES)
    target_year = models.PositiveIntegerField()

    target_value = models.DecimalField(max_digits=10, decimal_places=2, default=100.00)
    # Add more fields as needed

    def __str__(self):
        return f"Target for {dict(MONTH_CHOICES)[self.target_month]} {self.target_year} is {self.target_value}"
 



# class Category(models.Model):
#     name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name

# class Product(models.Model):
#     name = models.CharField(max_length=155)    
#     category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
#     price = models.DecimalField(max_digits=10, decimal_places=2)
#     image = models.ImageField(default='products/product_default.jpg', upload_to='products/', null=True, blank=True)

#     def __str__(self):
#         return self.name
    
 


# class Order(models.Model):
#     customer = models.ForeignKey(Customer, related_name='orders', on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=False)
#     is_completed = models.BooleanField(default=False)

#     def __str__(self):
#         return f"Order {self.id}"
    
#     @property
#     def total_amount(self):
#         total_amount = 0

#         for item in self.orderitems.all():
#             total_amount += item.quantity * item.product.price
        
#         return total_amount


# class OrderItem(models.Model):
#     order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField(default=1)
  

#     def __str__(self):
#         return f"OrderItem {self.id} in Order {self.order_id}"