from rest_framework.decorators import api_view
from rest_framework.response import Response
from selection.serializers import SessionSerializer
from selection.models import Session
from django.core.exceptions import ValidationError

# Create your views here.
#-------------------------------- GET ALL USERS -----------------------------#
@api_view(['GET'])
def allSession(request):
    session = Session.objects.all().order_by('sessionAnnee')
    serialization = SessionSerializer(session, many=True)
    return Response(serialization.data)

#-------------------------------- GET ONE USER BY ID ------------------------#
@api_view(['GET'])
def getSession(request, id):
    try:
        session = Session.objects.get(sessionId=id)
        serialization = SessionSerializer(session)
        res = serialization.data
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res = {'status': 'ERROR', 'message': 'Session n\'existe pas dans la base de donnees'}
    return Response(res)

#------------------------------ CLOSE SESSSION ------------------------------#
@api_view(['GET'])
def closeSession(request, id):
    try:
        Session.objects.filter(sessionId = id).update(sessionStatus='F')
        res = {'status': 'OK', 'message': 'Session fermee'}
    except:
        res = res = {'status': 'ERROR', 'message': 'Session n\'existe pas dans la base de donnees'}
    return Response(res);

#------------------------------- CREATE NEW USER ----------------------------#
@api_view(['POST'])
def addSession(request):
    try:
        serialization = SessionSerializer(data = request.data, many = False)
        if serialization.is_valid():
            serialization.save()
            res = serialization.data
        else:
            res = {'status': 'ERROR', 'message': 'Etrees invalides'}
    except:
        res = {'status': 'ERROR', 'message': 'Echec de l\'enregistrement'}
    return Response(res)

#------------------------------- UPDATE USER --------------------------------#
@api_view(['PUT'])
def updateSession(request, id):
    try:
        session = Session.objects.get(sessionId=id)
        serialization = SessionSerializer(instance = session, data = request.data)
        if serialization.is_valid():
            serialization.save()
            res = serialization.data
        else:
            res = {'status': 'ERROR', 'message': 'Etrees invalides'}
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res = {'status': 'ERROR', 'message': 'Echec de l\'enregistrement'}
    return Response(res)

#------------------------------- DELETE USER --------------------------------#
@api_view(['DELETE'])
def deleteSession(request, id):
    try:
        session = Session.objects.get(sessionId=id)
        session.delete()
        res = {'status': 'OK', 'message': 'Session supprime'}
    except ValidationError:
        res = {'status': 'ERROR', 'message': 'Identifiant invalide'}
    except:
        res = res = {'status': 'ERROR', 'message': 'Echec de la suppression'}
    return Response(res)
