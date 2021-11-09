from rest_framework.decorators import api_view
from rest_framework.response import Response
from selection.serializers import DossierSerializer
from selection.models import Dossier, Parcours, Session
from django.core.exceptions import ValidationError
#GET ALL DOSSIER OF ALL PARCOURS
@api_view(['GET'])
def allDossiersAllParcours(request, id_session):
    try:
        dossier = Dossier.objects.all().filter(dossierSession=id_session).order_by('dossierParcours_id')
        serialization = DossierSerializer(dossier, many=True)
        res = serialization.data
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res = {'status': 'ERROR', 'message': 'Echec de la recuperation'}
    return Response(res)

#GET ALL Dossier of a parcours
@api_view(['GET'])
def allDossiersParcour(request, id_parcours, id_session):
    try:
        dossier = Dossier.objects.all().filter(dossierParcours=id_parcours).filter(dossierSession=id_session).order_by('dossierNumInscription')
        serialization = DossierSerializer(dossier, many=True)
        res = serialization.data
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res = {'status': 'ERROR', 'message': 'Echec de la recuperation'}
    return Response(res)

#GET ONE Dossier BY ID
@api_view(['GET'])
def getOneDossier(request, id):
    try:
        dossier = Dossier.objects.get(dossierId=id)
        serialization = DossierSerializer(dossier, many=False)
        res = serialization.data
    except:
        res = {'status': 'ERROR', 'message': 'Dossier n\'existe pas dans la base de donnees'}
    return Response(res)

#CREATE NEW Dossier
@api_view(['POST'])
def addDossier(request, id_parcours, id_session):
    try:
        parcours = Parcours.objects.get(parcoursId=id_parcours)
        session = Session.objects.get(sessionId=id_session)
        serialization = DossierSerializer(data = request.data, many = False)
        request.data['dossierParcours'] = id_parcours
        request.data['dossierSession'] = id_session
        if serialization.is_valid():
            serialization.save()
            res = serialization.data
        else:
            res = {'status': 'ERROR', 'message': 'Les donnees de l\'entrees invalides'}
    except:
        res = {'status': 'ERROR', 'message': 'Parcours n\'existe pas dans la base de donnees'}
    return Response(res)

#UPDATE Dossier
@api_view(['PUT'])
def updateDossier(request, id):
    try:
        dossier = Dossier.objects.get(dossierId=id)
        request.data['dossierParcours'] = dossier.dossierParcours.parcoursId
        request.data['dossierSession'] = dossier.dossierSession.sessionId
        serialization = DossierSerializer(instance = dossier, data = request.data)
        if serialization.is_valid():
            serialization.save()
            res = serialization.data
        else:
            res = {'status': 'ERROR', 'message': 'Entrees invalides'}
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res = {'status': 'ERROR', 'message': 'Echec de la mis a jour, Dossier n\'existe pas dans la base de donnees'}
    return Response(res)

#DELETE Dossier
@api_view(['DELETE'])
def deleteDossier(request, id):
    try:
        dossier = Dossier.objects.get(dossierId=id)
        dossier.delete()
        res = {'status': 'OK', 'message': 'Dossier deleted'}
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res = {'status': 'ERROR', 'message': 'Dossier n\'existe pas dans la base de donnees'}
    return Response(res)
