# Generated by Django 2.2.18 on 2021-09-01 13:13

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=32)),
                ('mail', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=32)),
            ],
        ),
    ]