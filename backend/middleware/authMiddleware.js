import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const protect = async(req, res, next)=>{
    console.log('jdklsjdkl')
    try {
        let token;
        token = req.cookies.jwt;
        
        if(token) {
            try {
                const decoded = jwt.verify(token , process.env.JWT_SECRET)
                console.log(token)
                req.user = await User.findById(decoded.userId).select('-password')
                next();
            } catch (error) {
                res.status(401);
                console.log(error.message)
                throw new Error ('Not authorized, invalid token')
            }
        }else{
            res.status(401)
            throw new Error('Not authorized , no token')
        }

    } catch (error) {
        res.json(error.message)
        console.log(error.message)
    }
}


const adminProtect = async(req, res , next) => {
    let adminToken;
    adminToken = req.cookies.jwt_admin
    if(adminToken){
        try {

            const decoded = jwt.verify(adminToken , process.env.JWT_SECRET)

            req.admin = await User.findById(decoded.adminId).select('-password')
            next();

        } catch (error) {
            res.status(401);
            console.log(error.message)
            throw new Error ('Not authorized, invalid token')
        }
    }else{
        res.status(401)
        throw new Error('Not authorized , no token')
    }
}


export {protect , adminProtect}