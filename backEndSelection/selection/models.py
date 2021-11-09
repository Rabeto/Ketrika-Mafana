import uuid
import datetime
from django.db import models

# Create your models here.
#MODEL FOR PARCOURS
class Parcours(models.Model):
    parcoursId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    parcoursName = models.CharField(max_length=50)
    parcoursMention = models.CharField(max_length=50)
    parcoursEtab = models.CharField(max_length=50)
    parcoursOrdre = models.IntegerField()

#MODEL FOR USER COMPTE
class Compte(models.Model):
    role = (
    	('ADMIN', 'ADMINISTRATEUR'),
    	('USER', 'UTILISATEUR')
    )
    compteId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    compteUsername = models.CharField(max_length=20, unique=True)
    comptePassword = models.CharField(max_length=128)
    compteRole = models.CharField(max_length=5, choices=role, default='USER')
    compteFullname = models.CharField(max_length=50)
    compteMail = models.EmailField(max_length=50)
    compteCreatedDate = models.DateField(default= datetime.date.today)
    compteParcours = models.ForeignKey(Parcours, on_delete=models.CASCADE, null=True) #MANY TO ONE (PARCOURS)1e84e8e7-7b6c-4d9f-870f-a2b83646c954

#MODEL FOR SESSION
class Session(models.Model):
    staus = (
        ('F', 'FERMEE'),
        ('O', 'OUVERTE')
    )
    sessionId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sessionDescription = models.CharField(max_length=255)
    sessionStatus = models.CharField(max_length=10, choices=staus)
    sessionAnnee = models.CharField(max_length=9)

#MODEL FOR MATIERE
class Matiere(models.Model):
    matiereId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    matiereCode = models.CharField(max_length=8)
    matiereName = models.CharField(max_length=50)
    matiereCoeff = models.IntegerField()
    matiereParcour = models.ForeignKey(Parcours, on_delete=models.CASCADE, null=True)

#MODEL FOR DOSSIER
class Dossier(models.Model):
    dossierId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    dossierNumInscription = models.CharField(max_length=8)
    dossierSession = models.ForeignKey(Session, on_delete=models.CASCADE) #MANY TO ONE (SESSION)
    dossierName = models.CharField(max_length=50)
    dossierDateNaissance = models.DateField()
    dossierLieuNaissance = models.CharField(max_length=50)
    dossierParcours = models.ForeignKey(Parcours, on_delete=models.CASCADE) #MANY TO ONE (PARCOURS)

#MODEL FOR RELEVE DE NOTE
class ReleveNote(models.Model):
    releveNoteDossier = models.OneToOneField(Dossier, on_delete=models.CASCADE, primary_key=True, default=uuid.uuid4) #ONE TO ONE (RELEVE DE NOTE)
    releveNoteAnnee = models.CharField(max_length=4)
    releveNoteCentre = models.CharField(max_length=50)
    releveNoteSerie = models.CharField(max_length=1)
    releveNoteNumInscription = models.CharField(max_length=8)
    releveNoteMention = models.CharField(max_length=20)

#MODEL FOR NOTE
class Note(models.Model):
    noteId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    noteMatiere = models.ForeignKey(Matiere, on_delete=models.CASCADE)
    noteReleve = models.ForeignKey(ReleveNote, on_delete=models.CASCADE)
    noteValue = models.DecimalField(max_digits=4, decimal_places=2)
