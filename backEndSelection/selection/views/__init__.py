from .parcours import allParcours, addParcour, getParcour, updateParcour, deleteParcour
from .compte import allCompte, getOneCompte, addCompte, updateCompte, changePasswordCompte, deleteCompte, authentification, allUserCompte
from .session import allSession, getSession, closeSession, addSession, updateSession, deleteSession
from .matiere import allMatieres, allMatieresParcour, getOneMatiere, addMatiere, updateMatiere, deleteMatiere
from .dossier import allDossiersAllParcours, allDossiersParcour, deleteDossier, getOneDossier, addDossier, updateDossier
from .releveNote import getRNDossier, addRNToDossier, updateRNOfDossier
from .note import getAllNotesOfRN, getOneNote, addNote, updateNote
