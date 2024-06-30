import express from 'express';
import { getAll, addOnce, getOnce,putOnce, deleteOnce,searchSalle,getHighestRatedSalle,getMostReservedSalle } from '../controllers/salle.js';
import multer from '../middlewares/multer-config.js';


const router = express.Router();
//CRUD
router
  .route('/')
  .get(getAll)
  .post(
    multer, 
    //body('nomSalle').isLength({ min: 5 }), // Le nom doit comporter au moins 5 caractères
    //body('capacité').isNumeric(), 
    //body('tarif').isNumeric(),
    addOnce);
    
//la salle la mieux notée
router
.route('/mieuxNotee')

.get(getHighestRatedSalle);
//la salle la plus réservée
router
  .route('/plusReservee')
  .get(getMostReservedSalle);

router
  .route('/:id')
  .get(getOnce)
  .put(putOnce)
  .delete(deleteOnce);

  //recherche
router
.route("/search/:key")
.get(searchSalle);



export default router;