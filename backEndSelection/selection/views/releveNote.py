from rest_framework.decorators import api_view
from rest_framework.response import Response
from selection.serializers import ReleveNoteSerializer
from selection.models import Dossier, ReleveNote

#GET ALL RELEVE NOTE OF A DOSSIER
@api_view(['GET'])
def getRNDossier(request, id_dossier):
    try:
        dossier = Dossier.objects.get(dossierId=id_dossier)
        rn = ReleveNote.objects.get(releveNoteDossier=dossier)
        serialisation = ReleveNoteSerializer(rn, many=False)
        res = serialisation.data;
    except:
        res = {}
    return Response(res)

#CREATE NEW RELEVE DE NOTE
@api_view(['POST'])
def addRNToDossier(request, id_dossier):
    try:
        request.data['releveNoteDossier'] = id_dossier;
        serialisation = ReleveNoteSerializer(data=request.data, many = False)
        if serialisation.is_valid():
            serialisation.save()
            res = serialisation.data;
        else:
            res = {'status': 'ERROR', 'message': 'Entrees ivalides'}
    except:
        res = {'status': 'ERROR', 'message': 'Erreur de l\'enregistrement'}
    return Response(res)

#UPDATE A RELEVE NOTE
@api_view(['PUT'])
def updateRNOfDossier(request, id_dossier):
    try:
        dossier = Dossier.objects.get(dossierId=id_dossier)
        rn = ReleveNote.objects.get(releveNoteDossier=dossier)
        serialisation = ReleveNoteSerializer(instance=rn, data=request.data)
        if serialisation.is_valid():
            serialisation.save()
            res = serialisation.data;
        else: 
            res = {'status': 'ERROR', 'message': 'Entrees ivalides'}
    except:
        res = {'status': 'ERROR', 'message': 'Erreur de l\'enregistrement'}
    return Response(res)