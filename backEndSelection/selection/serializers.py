from rest_framework import serializers
from .models import Compte, Dossier, Matiere, Parcours, Session, ReleveNote, Note

class ParcoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parcours
        fields = '__all__'

class CompteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compte
        fields = '__all__'

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'

class MatiereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matiere
        fields = '__all__'

class DossierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dossier
        fields = '__all__'

class ReleveNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleveNote
        fields = '__all__'

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
