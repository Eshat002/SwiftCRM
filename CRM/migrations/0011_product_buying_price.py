# Generated by Django 5.0.4 on 2024-04-28 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CRM', '0010_alter_targetorder_unique_together_targetexpense'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='buying_price',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
    ]
