import express from 'express'
import multer from 'multer';
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, updateUserImage } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import path from 'path'
import fs from 'fs'

const router = express.Router();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current file
const __dirname = dirname(__filename);

const uploadsDir = path.join(__dirname, '../uploads'); 
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
    }


//image upload
const storage = multer.diskStorage({

    destination: (req,file,cb)=>{
        cb(null, uploadsDir);
    },
    filename: (req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}_${file.originalname}`)
        
    }
})
const upload = multer({storage:storage})

router.post('/auth', authUser);  
router.post('/', registerUser);  
router.post('/logout', logoutUser);  
router.route('/profile').get(protect,getUserProfile).put(protect, updateUserProfile);
//router.put('/profile/upload', protect,upload.single('profileImage') ,updateUserImage )  
router.put('/profile/upload', protect, 
    (req,res,next ) => {
        upload.single('profileImage')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              console.log(err.message)
              return res.status(500).json({ message: 'Multer Error: ' + err.message });
            } else if (err) {
              console.log(err.message)
              return res.status(500).json({ message: 'Unknown Error: ' + err.message });
            }
            next();
          });
    } ,
    updateUserImage )  

export default router;