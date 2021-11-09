import uuid
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from selection.serializers import CompteSerializer
from selection.models import Compte
from django.core.exceptions import ValidationError

#GET ALL COMPTE
@api_view(['GET'])
def allCompte(request):
    compte = Compte.objects.all()
    serialization = CompteSerializer(compte, many=True)
    return Response(serialization.data)

#GET ALL USER COMPTE
@api_view(['GET'])
def allUserCompte(request):
    compte = Compte.objects.all().filter(compteRole = 'USER').order_by('compteParcours', 'compteUsername')
    serialization = CompteSerializer(compte, many=True)
    return Response(serialization.data)

#GET ONE COMPTE BY ID
@api_view(['GET'])
def getOneCompte(request, id):
    try:
        compte = Compte.objects.get(compteId=id)
        serialization = CompteSerializer(compte, many=False)
        res = serialization.data
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res = {'status': 'ERROR', 'message': 'Compte n\'existe pas dans la base de donnees'}
    return Response(res)

#AUTHENTICATION
@api_view(['GET'])
def authentification(request, username, password):
    try:
        user = Compte.objects.get(compteUsername = username)
        if(check_password(password= password, encoded = user.comptePassword)):
            compte = CompteSerializer(user, many=False)
            res = {'status': 'OK', 'compte': compte.data}
        else:
            res = {'status': 'ERROR', 'message': 'Mot de passe incorrect'}
    except:
        res = {'status': 'ERROR', 'message': 'Utilisateur n\'existe pas dans la base des donnees'}
    return Response(res)

#CREATE NEW COMPTE
@api_view(['POST'])
def addCompte(request, id_parcours):
    try:
        request.data['comptePassword'] = make_password(password=request.data['comptePassword'], salt=None, hasher='default')
        request.data['compteParcours'] = id_parcours
        serialization = CompteSerializer(data = request.data, many = False)
        if serialization.is_valid():
            serialization.save()
            res = serialization.data
        else:
            res = {'status': 'ERROR', 'message': 'Entrees invalides'}
    except:
        res = {'status': 'ERROR', 'message': 'Echec de l\'enregistrement'}
    return Response(res)


#UPDATE COMPTE
@api_view(['PUT'])
def updateCompte(request, id):
    try:
        compte = Compte.objects.get(compteId=id)
        request.data['comptePassword'] = compte.comptePassword
        request.data['compteParcours'] = compte.compteParcours.parcoursId
        serialization = CompteSerializer(instance = compte, data = request.data)
        if serialization.is_valid():
            serialization.save()
            res = serialization.data
        else:
            res = {'status': 'ERROR', 'message': 'Entrees invalides'}
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res = {'status': 'ERROR', 'message': 'Echec de la modification'}
    return Response(serialization.data)

@api_view(['PUT'])
def changePasswordCompte(request, id):
    try:
        compte = Compte.objects.get(compteId=id)
        if(check_password(password=request.data['oldPassword'], encoded = compte.comptePassword)):
            compte.comptePassword = make_password(password=request.data['newPassword'], salt=None, hasher='default')
            compte.save()
            res = {'status': 'OK', 'message': 'Mot de passe change'}
        else:
            res = {'status': 'ERROR', 'message': 'Ancien mot de passe incorrect'}
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res = {'status': 'ERROR', 'message': 'Echec du changement de mot de passe'}
    return Response(res)

#DELETE COMPTE
@api_view(['DELETE'])
def deleteCompte(request, id):
    try:
        compte = Compte.objects.get(compteId=id)
        compte.delete()
        res = {'status': 'OK', 'message': 'Compte supprime'}
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res = {'status': 'ERROR', 'message': 'Echec de la suppression'}
    return Response(res)
