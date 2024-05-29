import express from 'express';
import { body } from 'express-validator';
import multer from '../middlewares/multer-config.js';


import { getAll, addOnce, getOnce, putOnce , deleteOnce} from '../controllers/Evenement.js';
  
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