# Generated by Django 2.2.18 on 2021-09-06 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('selection', '0002_user_parcours'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=128),
        ),
    ]
