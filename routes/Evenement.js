import express from 'express';
import { body } from 'express-validator';
import multer from '../middlewares/multer-config.js';


import { getAll, addOnce, getOnce, putOnce, deleteOnce, cancelReservation, searchEvenement, searchEvenementByCategory, getMostVisitedEvent } from '../controllers/Evenement.js';

const router = express.Router();

router
  .route('/')
  .get(getAll)
  .post(addOnce);

router
  .route('/:id')
  .get(getOnce)
  .put(putOnce)
  .delete(deleteOnce);

router
  .route('/:cancel/:eventId')
  .delete(cancelReservation);

router
  .route("/search/:key")
  .get(searchEvenement);

router
router.get('/searchByCategory/:category', searchEvenementByCategory);

router
  .route("/mostVisited/:most")
  .get(getMostVisitedEvent);



export default router;

// 127.0.0.1:9090/Evenement/mostVisited/most
// 127.0.0.1:9090/Evenement/searchByCategory/soirée VIP
// 127.0.0.1:9090/Evenement/search/DateDebut=2024-01-31
// 127.0.0.1:9090/Evenement/cancel/6659f58676b5778956ccb3d6
// 127.0.0.1:9090/reservation/filter/confirmée
// 127.0.0.1:9090/typeEvenement/deleteTypeEvenement/6658a8334a12e606d0976359