import express from 'express'; 

import {signIn,getUserByEmail,createUser,deleteUser,getUserById,getUsers,updateUser,displayAdminUsers,displayRegularUsers,verifyUser,sendVerificationCode,authenticateToken} from "../controllers/user.js"
const router = express.Router();

router.post('/', createUser);
router.get('/', authenticateToken,getUsers);
router.get('/:id', getUserById);
router.get('/getuserbyEmail/:email', getUserByEmail);
// router.get('/getUserByemail', getUserByEmail);
// router.get('/users/:email', async (req, res) => {
//     try {
//       const { email } = req.params;
//       const user = await getUserByEmail(email);
  
//       if (user) {
//         res.status(200).json(user);
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/displayAdminUsers',displayAdminUsers);
router.get('/displayRegularUsers',displayRegularUsers);
router.post('/signin', signIn);
router.get("/verify/:userId/:verificationCode", verifyUser);

// Route to send the verification code
router.post('/send-verification-code', sendVerificationCode);

// // verify user email verification
// router.get("/verify/:id/:token", controller.verifyEmail);

// Route to verify the code
//router.post('/verify-code', verifyCode);
export default router;