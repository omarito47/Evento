import express from 'express';

import { getCommentairesByReclamation, addCommentaire, deleteCommentaire, updateCommentaire, satisfaitComment, nonSatisfaitComment } from '../controllers/commentaire.js';

const router = express.Router();

router
  .route('/')
//   .get(getServices)
  .post(addCommentaire);

router
  .route('/:id')
  .get(getCommentairesByReclamation)
  .put(updateCommentaire)
  .delete(deleteCommentaire)
router
  .route('/:id/valide')
  .get(satisfaitComment);
router
  .route('/:id/invalide')
  .get(nonSatisfaitComment);

  
export default router;