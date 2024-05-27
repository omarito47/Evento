import express from 'express';

import { getAll, addOnce, getOnce, putOnce , deleteOnce} from '../controllers/categorie.js';
import { body } from 'express-validator';
  
const router = express.Router();

router
  .route('/')
  .get(getAll)
  .post(
    body('nom_categorie').isLength({min:3,max:15}).isAlpha(),
    addOnce);

router
  .route('/:id')
  .get(getOnce)
  .put(putOnce)
  .delete(deleteOnce);

  
export default router;