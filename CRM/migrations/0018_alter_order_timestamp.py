# Generated by Django 5.0.4 on 2024-05-21 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CRM', '0017_alter_order_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='timestamp',
            field=models.DateField(),
        ),
    ]
