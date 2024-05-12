from django.db import models

class Customer(models.Model):
    first_name = models.CharField(max_length=80, null=True, blank=True)
    last_name = models.CharField(max_length=80, null=True, blank=True)
    email= models.EmailField(null=True, blank=False)
    shipping_address = models.CharField(max_length=255, null=True, blank= True)
    phone_number = models.CharField(max_length=20, null=True, blank= True)
    timestamp = models.DateTimeField(auto_now_add=False, null=True)

    @property
    def total_spent(self):
        total_spent = 0

        # Iterate over each order related to this customer
        for order in self.orders.all():
            total_spent += order.quantity * order.product.price

        return total_spent
    
    # class Meta:
    #     ordering =['-id']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

