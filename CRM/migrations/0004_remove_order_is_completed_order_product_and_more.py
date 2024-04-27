# Generated by Django 5.0.4 on 2024-04-23 19:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CRM', '0003_alter_product_options_alter_order_created_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='is_completed',
        ),
        migrations.AddField(
            model_name='order',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='CRM.product'),
        ),
        migrations.DeleteModel(
            name='OrderItem',
        ),
    ]
