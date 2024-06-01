import express from 'express';

import { getCommentairesByReclamation, addCommentaire, deleteCommentaire, updateCommentaire, satisfaitComment, nonSatisfaitComment } from '../controllers/commentaire.js';

const router = express.Router();

router
  .route('/')
//   .get(getServices)
  .post(addCommentaire);

router
  .route('/:id')
  // .get(getCommentairesByReclamation)
  .put(updateCommentaire)
  .delete(deleteCommentaire)

router
.route('/:iduser/:idrec')
.get(getCommentairesByReclamation)

router
  .route('/:id/valide')
  .patch(satisfaitComment);
router
  .route('/:id/invalide')
  .patch(nonSatisfaitComment);

  

  
export default router;