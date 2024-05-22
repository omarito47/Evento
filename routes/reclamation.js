import express from 'express';

import { getAll, addOnce, getOnce, putOnce ,deleteOnce } from '../controllers/reclamation.js';
import { body } from 'express-validator';


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
  
  
export default router;