# Generated by Django 2.2.18 on 2021-09-25 17:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('selection', '0032_remove_compte_compteparcours'),
    ]

    operations = [
        migrations.AddField(
            model_name='compte',
            name='compteParcours',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='selection.Parcours'),
        ),
    ]