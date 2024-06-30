import express from 'express'; 

import {createUser,deleteUser,getUserById,getUsers,updateUser,displayAdminUsers,displayRegularUsers} from "../controllers/User.js"
const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/displayAdminUsers',displayAdminUsers);
router.get('/displayRegularUsers',displayRegularUsers);

export default router;