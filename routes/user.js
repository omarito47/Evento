import express from 'express'; 
import { createUser, deleteUser, getUserById, getUsers, updateUser, signin, signup, displayAdminUsers, displayRegularUsers } from '../controllers/user.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/signin', signin);
router.post('/signup', signup);
router.get('/displayAdminUsers', displayAdminUsers);
router.get('/displayRegularUsers', displayRegularUsers);

export default router; // Assurez-vous que ceci est l'exportation par défaut
