# Generated by Django 2.2.18 on 2021-10-09 01:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('selection', '0034_auto_20211009_0045'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='relevenote',
            name='releveNote',
        ),
        migrations.RemoveField(
            model_name='relevenote',
            name='releveNoteMatiere',
        ),
        migrations.RemoveField(
            model_name='matiere',
            name='matiereParcours',
        ),
        migrations.DeleteModel(
            name='Note',
        ),
        migrations.DeleteModel(
            name='ReleveNote',
        ),
    ]