import express from 'express';
import { body } from 'express-validator';


import { getAll, addOnce, getOnce, putOnce, deleteOnce, delet } from '../controllers/TypeEvenement.js';

const router = express.Router();

router
    .route('/')
    .get(getAll)
    .post(
        body("name").isLength({ max: 20 }).isAlpha(),
        body('libelle').isLength({min:3,max:15}).isAlpha(),
    addOnce);

       

router
    .route('/:id')
    .get(getOnce)
    .put(putOnce)
    .delete(delet);

export default router;