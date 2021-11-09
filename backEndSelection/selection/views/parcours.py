from rest_framework.decorators import api_view
from rest_framework.response import Response
from selection.serializers import ParcoursSerializer
from selection.models import Parcours
from django.core.exceptions import ValidationError

# Create your views here.
#-------------------------------- GET ALL USERS -----------------------------#
@api_view(['GET'])
def allParcours(request):
    parcours = Parcours.objects.all().order_by('parcoursOrdre')
    serialization = ParcoursSerializer(parcours, many=True)
    return Response(serialization.data)

#-------------------------------- GET ONE USER BY ID ------------------------#
@api_view(['GET'])
def getParcour(request, id):
    try:
        parcour = Parcours.objects.get(parcoursId=id)
        serialization = ParcoursSerializer(parcour)
        res = serialization.data
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res =  {'status': 'ERROR', 'message': 'Donnees n\'existe pas dans la base des donnees'}
    return Response(res)

#------------------------------- CREATE NEW USER ----------------------------#
@api_view(['POST'])
def addParcour(request):
    try:
        serialization = ParcoursSerializer(data = request.data, many = False)
        if serialization.is_valid():
            serialization.save()
            res = serialization.data
        else:
            res =  {'status': 'ERROR', 'message': 'Entrees invalides'}
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res =  {'status': 'ERROR', 'message': 'Donnees n\'existe pas dans la base des donnees'}
    return Response(res)

#------------------------------- UPDATE USER --------------------------------#
@api_view(['PUT'])
def updateParcour(request, id):
    try:
        parcour = Parcours.objects.get(parcoursId=id)
        serialization = ParcoursSerializer(instance = parcour, data = request.data)
        if serialization.is_valid():
            serialization.save()
            res = serialization.data
        else:
            res =  {'status': 'ERROR', 'message': 'Entrees invalides'}
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res = {'status': 'ERROR', 'message': 'Echec de la modification'}
    return Response(res)

#------------------------------- DELETE USER --------------------------------#
@api_view(['DELETE'])
def deleteParcour(request, id):
    try:
        parcours = Parcours.objects.get(parcoursId=id)
        parcours.delete()
        res = {'status': 'OK', 'message': 'Parcours supprime'}
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res = {'status': 'ERROR', 'message': 'Echec de la suppression'}
    return Response(res)
