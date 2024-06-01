import express from 'express'; 

import {createUser,deleteUser,getUserById,getUsers,updateUser,displayAdminUsers,displayRegularUsers,mesReservations} from "../controllers/user.js"
const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/displayAdminUsers',displayAdminUsers);
router.get('/displayRegularUsers',displayRegularUsers);

// Obtenir les réservations d'un utilisateur
router
  .route('/:userId')
  .get(mesReservations);

export default router;