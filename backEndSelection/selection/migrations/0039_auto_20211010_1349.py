# Generated by Django 2.2.18 on 2021-10-10 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('selection', '0038_remove_relevenote_relevenotematiere'),
    ]

    operations = [
        migrations.AlterField(
            model_name='relevenote',
            name='releveNoteNumInscription',
            field=models.CharField(max_length=8),
        ),
    ]
