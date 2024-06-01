import express from 'express';
import { ajouterParticipation, supprimerParticipation, obtenirToutesLesParticipations } from '../controllers/participation.js';

const router = express.Router();

// Route pour ajouter une participation
router.post('/', async (req, res) => {
  try {
    const { userId, atelierId, categorieId } = req.body;
    await ajouterParticipation(userId, atelierId, categorieId);
    res.status(201).json({ message: 'Participation ajoutée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour supprimer une participation
router.delete('/:id', async (req, res) => {
  try {
    const participationId = req.params.id;
    await supprimerParticipation(participationId);
    res.status(200).json({ message: 'Participation supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour obtenir toutes les participations
router.get('/', async (req, res) => {
  try {
    const participations = await obtenirToutesLesParticipations();
    res.status(200).json(participations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
