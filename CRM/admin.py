from .models import *
from django.contrib import admin
from django.core.exceptions import ValidationError
from django import forms
from .models import Product

class ProductAdminForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'

    def clean(self):
        cleaned_data = super().clean()
        price = cleaned_data.get('price')
        buying_price = cleaned_data.get('buying_price')

        if buying_price is not None and price is not None:
            if buying_price >= price:
                raise ValidationError("Buying price must be lower than the actual price.")

        return cleaned_data

class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm


admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
admin.site.register(Order)
admin.site.register(TargetOrder)
admin.site.register(TargetExpense)

