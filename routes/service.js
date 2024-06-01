import express from 'express';

import { getServices, addService, getServiceById, updateService , deleteService, searchService} from '../controllers/service.js';
import { body } from 'express-validator';

const router = express.Router();

router
  .route('/')
  .get(getServices)
  .post(
    body('libelle').isLength({min:3,max:15}).isAlpha(),
    addService);

router
  .route('/:id')
  .get(getServiceById)
  .put(updateService)
  .delete(deleteService);
  router
  .route('/search/:key')
  .get(searchService)
  
export default router;