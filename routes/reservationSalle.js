import express from 'express';

import {addOnce,deleteOnce,getAll,getOnce,putOnce} from '../controllers/reservationSalle.js';
  
const router = express.Router();
//CRUD
router
  .route('/')
  .get(getAll)
  .post(addOnce);

 router
   .route('/:id')
   .get(getOnce)
   .put(putOnce)
   .delete(deleteOnce);


  
export default router;