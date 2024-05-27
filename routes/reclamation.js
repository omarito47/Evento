import express from 'express';

import { getReclamations, addReclamation, getReclamationById, UpdateReclamation ,deleteReclamation, fermerReclamation, OuvrireReclamation, traiterReclamation, searchReclamation, getReclamationsFermer, getReclamationsOuvert, getReclamationsSortedByDate  } from '../controllers/reclamation.js';
import { body } from 'express-validator';
import multer from '../middlewares/multer-config.js';


const router = express.Router();

//******************************* CRUD ROUTES  ********************************* 
router
  .route('/')
  .get(getReclamations)
  .post(
    multer('pieceJointe',5 * 1024 * 1024),
    body("title").isLength({max:20}).isAlpha(),
    body("description").isLength({max:1000}),
    body("email").isEmail(),
    body("numTelReclamation").isNumeric().isLength({ min: 8, max: 8 }),
    addReclamation);

router
  .route('/:id')
  .get(getReclamationById)
  .patch(UpdateReclamation)
  .delete(deleteReclamation);
//*************************************************************************** */

//****************** SEACH RECLAMATION  ******************* 
router
  .route('/ouvert')
  .get(getReclamationsOuvert)

router
  .route('/sort/date')
  .get(getReclamationsSortedByDate);
router
  .route('/fermer')
  .get(getReclamationsFermer)

router
  .route("/search/:key")
  .get(searchReclamation);
//*************************************************************************** */

//****************** TRAITEMENT OUVRIRE/FERMER RECLAMATION  ******************* 
router
  .route('/:id/fermer')
  .patch(fermerReclamation)
router
  .route('/:id/ouvrire')
  .patch(OuvrireReclamation)
router
  .route('/:id/traiter')
  .patch(traiterReclamation)
//*************************************************************************** */

  
export default router;