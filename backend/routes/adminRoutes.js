import express from 'express';
import { adminLogin , adminLogout , createUser, getAllUsers, deleteUser, editUser, editUserGet } from '../controllers/adminController.js';
import { adminProtect } from '../middleware/authMiddleware.js';
const router = express.Router();


router.post( '/login' , adminLogin)
router.post( '/logout' , adminLogout)
router.get( '/userslist' ,adminProtect, getAllUsers)
router.post( '/userslist/create' ,adminProtect, createUser)
router.delete( '/userslist/delete/:id' ,adminProtect, deleteUser)
router.put('/userslist/edit/:id' , adminProtect , editUser)
router.get('/userslist/edit/:id' , adminProtect , editUserGet)


export default router;