# Generated by Django 2.2.18 on 2021-09-16 20:12

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('selection', '0020_delete_note'),
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('noteId', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('noteValue', models.DecimalField(decimal_places=2, max_digits=4)),
                ('noteMatiere', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='selection.Matiere')),
                ('noteReleve', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='selection.ReleveNote')),
            ],
        ),
    ]
