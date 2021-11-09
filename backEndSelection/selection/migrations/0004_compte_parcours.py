# Generated by Django 2.2.18 on 2021-09-06 19:49

import datetime
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('selection', '0003_auto_20210906_1558'),
    ]

    operations = [
        migrations.CreateModel(
            name='Parcours',
            fields=[
                ('parcoursId', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('parcoursName', models.CharField(max_length=50)),
                ('parcoursMention', models.CharField(max_length=50)),
                ('parcoursEtab', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Compte',
            fields=[
                ('compteId', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('compteUsername', models.CharField(max_length=20)),
                ('comptePassword', models.CharField(max_length=128)),
                ('compteFullname', models.CharField(max_length=50)),
                ('compteMail', models.EmailField(max_length=50)),
                ('compteCreatedDate', models.DateField(default=datetime.date.today)),
                ('compteIdParcours', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='selection.Parcours')),
            ],
        ),
    ]
