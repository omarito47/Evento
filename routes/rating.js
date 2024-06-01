import express from 'express';
import {addRating,deleteRating,getRatingsBySalle} from '../controllers/rating.js';



const router = express.Router();

router.post('/',addRating);
router.delete('/:id',deleteRating);
router.get('/:idSalle',getRatingsBySalle);
//   .put(putOnce)
     

export default router;