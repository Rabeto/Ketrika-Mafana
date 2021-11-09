from rest_framework.decorators import api_view
from rest_framework.response import Response
from selection.serializers import NoteSerializer
from selection.models import Note, ReleveNote, Matiere

#GET ALL NOTES OF A DOSSIER
@api_view(['GET'])
def getAllNotesOfRN(request, id_rn):
    try:
        note = Note.objects.filter(noteReleve=id_rn)
        serialisation = NoteSerializer(note, many=True)
        res = serialisation.data
    except:
        res = {}
    return Response(res)

#GET ONE NOTE
@api_view(['GET'])
def getOneNote(request, id_rn, id_matiere):
    try:
        rn = ReleveNote.objects.get(releveNoteDossier_id=id_rn)
        try:
            mat = Matiere.objects.get(matiereId=id_matiere)
            try: 
                note = Note.objects.get(noteReleve=rn, noteMatiere=mat)
                serialisation = NoteSerializer(note, many=False)
                res = serialisation.data
            except:
                newN = {'noteReleve': id_rn, 'noteMatiere': id_matiere, 'noteValue': 0}
                serialisation = NoteSerializer(data=newN, many=False)
                if serialisation.is_valid():
                    serialisation.save()
                    res = serialisation.data;
        except:
            res = {"status": 'ERROR', 'message': 'MATIERE N\'EXISTE PAS'}
    except:
        res = {"status": 'ERROR', 'message': 'R. NOTE N\'EXISTE PAS'}
    return Response(res)

#ADD NEW NOTE
@api_view(['POST'])
def addNote(request, id_rn, id_matiere):
    try:
        request.data['noteReleve'] = id_rn
        request.data['noteMatiere'] = id_matiere
        serialisation = NoteSerializer(data=request.data, many=False)
        if serialisation.is_valid():
            serialisation.save()
            res = serialisation.data
        else:
            res = {'status': 'ERROR', 'message': 'Entrees ivalides'}
    except:
        res = {'status': 'ERROR', 'message': 'Echec de l\'enregistrement'}
    return Response(res)

@api_view(['PUT'])
def updateNote(request, id):
    try:
        note = Note.objects.filter(noteId=id)
        note.update(noteValue = request.data['noteValue'])
        note = Note.objects.get(noteId=id)
        serialisation = NoteSerializer(note, many=False)
        res = serialisation.data
    except:
        res = {'status': 'ERROR', 'message': 'Echec de l\'enregistrement'}
    return Response(res)
