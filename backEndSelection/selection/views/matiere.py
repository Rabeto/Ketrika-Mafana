from rest_framework.decorators import api_view
from rest_framework.response import Response
from selection.serializers import MatiereSerializer
from selection.models import Matiere, Parcours
from django.core.exceptions import ValidationError

#GET ALL Matiere
@api_view(['GET'])
def allMatieres(request):
    matiere = Matiere.objects.all()
    serialization = MatiereSerializer(matiere, many=True)
    return Response(serialization.data)

#GET ALL Matiere of a parcours
@api_view(['GET'])
def allMatieresParcour(request, id_parcours):
    try:
        matiere = Matiere.objects.filter(matiereParcour=id_parcours)
        serialization = MatiereSerializer(matiere, many=True)
        res = serialization.data
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res = {'status': 'ERROR', 'message': 'Echec de la recuperation'}
    return Response(res)

#GET ONE Matiere BY ID
@api_view(['GET'])
def getOneMatiere(request, id):
    try:
        matiere = Matiere.objects.get(matiereId=id)
        serialization = MatiereSerializer(matiere, many=False)
        res = serialization.data
    except:
        res = {'status': 'ERROR', 'message': 'Matiere n\'existe pas dans la base de donnees'}
    return Response(res)

#CREATE NEW Matiere
@api_view(['POST'])
def addMatiere(request, id_parcours):
    try:
        parcours = Parcours.objects.get(parcoursId=id_parcours)
        try:
            request.data['matiereParcour'] = id_parcours
            serialization = MatiereSerializer(data = request.data, many = False)
            if serialization.is_valid():
                serialization.save()
                res = serialization.data
            else:
                res = {'status': 'ERROR', 'message': 'Les donnees de l\'entrees invalides'}
        except:
            res = {'status': 'ERROR', 'message': 'Echec de l\'enregistrement'}
    except:
        res = {'status': 'ERROR', 'message': 'Parcours n\'existe pas dans la base de donnees'}
    return Response(res)

#UPDATE Matiere
@api_view(['PUT'])
def updateMatiere(request, id):
    try:
        matiere = Matiere.objects.get(matiereId=id)
        request.data['matiereParcour'] = matiere.matiereParcour.parcoursId
        serialization = MatiereSerializer(instance = matiere, data = request.data)
        if serialization.is_valid():
            serialization.save()
        res = serialization.data
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res = {'status': 'ERROR', 'message': 'Echec de la mis a jour, Matiere n\'existe pas dans la base de donnees'}
    return Response(res)

#DELETE Matiere
@api_view(['DELETE'])
def deleteMatiere(request, id):
    try:
        matiere = Matiere.objects.get(matiereId=id)
        matiere.delete()
        res = {'status': 'OK', 'message': 'Matiere deleted'}
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res = {'status': 'ERROR', 'message': 'Matiere n\'existe pas dans la base de donnees'}
    return Response(res)
