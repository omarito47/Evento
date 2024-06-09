import express from 'express';
import {addRating,deleteRating,getRatingsBySalle,getAll} from '../controllers/rating.js';



const router = express.Router();

router.post('/',addRating);
router.delete('/:id',deleteRating);
router.get('/:idSalle',getRatingsBySalle);
//   .put(putOnce)
router.get('/',getAll);    

export default router;