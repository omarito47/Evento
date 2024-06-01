import Participation from '../models/participation.js';

export async function ajouterParticipation(userId, atelierId, categorieId) {
    try {
        const participation = new Participation({
            user: userId,
            atelier: atelierId,
            categorie: categorieId
        });
        await participation.save();
        console.log('Participation ajoutée avec succès');
        return { success: true, message: 'Participation ajoutée avec succès' };
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la participation:', error);
        return { success: false, error: error.message };
    }
}

export async function supprimerParticipation(participationId) {
    try {
        await Participation.findByIdAndDelete(participationId);
        console.log('Participation supprimée avec succès');
        return { success: true, message: 'Participation supprimée avec succès' };
    } catch (error) {
        console.error('Erreur lors de la suppression de la participation:', error);
        return { success: false, error: error.message };
    }
}

export async function obtenirToutesLesParticipations() {
    try {
        const participations = await Participation.find()
            .populate('user')
            .populate('atelier')
            .populate('categorie');
        console.log('Liste des participations:', participations);
        return { success: true, participations };
    } catch (error) {
        console.error('Erreur lors de la récupération des participations:', error);
        return { success: false, error: error.message };
    }
}
