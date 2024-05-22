import express from 'express';

import { getAll, addOnce, getOnce, putOnce , deleteOnce} from '../controllers/service.js';
import { body } from 'express-validator';
  
const router = express.Router();

router
  .route('/')
  .get(getAll)
  .post(
    body('libelle').isLength({min:3,max:15}).isAlpha(),
    addOnce);

router
  .route('/:id')
  .get(getOnce)
  .put(putOnce)
  .delete(deleteOnce);

  
export default router;