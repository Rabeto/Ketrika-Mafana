# Generated by Django 2.2.18 on 2021-10-27 12:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('selection', '0041_auto_20211010_1933'),
    ]

    operations = [
        migrations.AddField(
            model_name='parcours',
            name='parcoursOrdre',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
