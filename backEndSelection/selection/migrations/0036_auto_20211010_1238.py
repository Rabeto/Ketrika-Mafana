# Generated by Django 2.2.18 on 2021-10-10 12:38

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('selection', '0035_auto_20211009_0119'),
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('noteId', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('noteValue', models.DecimalField(decimal_places=2, max_digits=4)),
                ('noteMatiere', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='selection.Matiere')),
            ],
        ),
        migrations.CreateModel(
            name='ReleveNote',
            fields=[
                ('releveNoteDossier', models.OneToOneField(default=uuid.uuid4, on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='selection.Dossier')),
                ('releveNoteSession', models.CharField(max_length=4)),
                ('releveNoteCentre', models.CharField(max_length=50)),
                ('releveNoteSerie', models.CharField(max_length=1)),
                ('releveNoteNumInscription', models.CharField(max_length=6)),
                ('releveNoteMention', models.CharField(max_length=20)),
                ('releveNoteMatiere', models.ManyToManyField(through='selection.Note', to='selection.Matiere')),
            ],
        ),
        migrations.AddField(
            model_name='note',
            name='noteReleve',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='selection.ReleveNote'),
        ),
    ]
