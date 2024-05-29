import express from 'express';
import { body } from 'express-validator';


import { getReservation, addReservation, getReservationById, deleteReservation  } from '../controllers/reservation.js';

const router = express.Router();

router
  .route('/')
  .get(getReservation)
  .post(
    body('etat').isLength({min:3,max:15}).isAlpha(),
    addReservation);

router
  .route('/:id')
  .get(getReservationById)
  .delete(deleteReservation);

  
export default router;