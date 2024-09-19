import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
//@desc auth user / set token
//route POST / api/users/auth
//@access Public

const authUser = async(req, res)=>{

    const {email, password} = req.body;
    try {
        const user = await User.findOne({email , role:'user'});
        if(!user){
            res.status(401);
            throw new Error ('User not found')
        }

        if(user && await user.matchPassword(password)){

            generateToken(res, user._id)
            res.status(201).json({
                id : user._id, 
                username: user.username,
                email: user.email,
                profileImage : user.profileImage
            })
            console.log('user logged in  successfully ')

        }else{
            res.status(401);
            throw new Error('Invalid credentials')
        }
       
    } catch (error) {
        res.json(error.message)
    }
   
   
} 

//@desc register new user
//route POST / api/users
//@access Public
const registerUser = async(req,res)=>{

    const {username, email , password} = req.body;

    try {
        const userExist = await User.findOne({email});
        console.log(userExist)
    
        if(userExist){
            res.status(400);
            throw new Error('User already exists')
        }
    
        const user = await User.create ({
            username, email, password
        });
    
        if(user){
            generateToken(res, user._id)
            res.status(201).json({
                id : user._id, 
                name: user.name,
                email: user.email
            })
            console.log('user created successfully ')
        }else{
            res.status(400);
            throw new Error('Invalid user data')
        }

    } catch (error) {
        console.error(error.message)
        res.json(error.message)
        
    }
   
 
}


//@desc logout user
//route POST / api/users/logout
//@access Public
const logoutUser = async(req,res)=>{

    try {
        
        res.cookie('jwt', '' , {
            httpOnly : true,
            expires: new Date(0)
        })

        res.status(200).json({message: 'user logged out'})

    } catch (error) {
        res.json(error.message)
    }
    
}

//@desc get user profile
//route POST / api/users/profile
//@access Private
const getUserProfile = async(req,res) => {
    const user = {_id: req.user._id,
        username: req.user.username, 
        email : req.user.email
    }

    res.status(200).json({user})
}

//@desc update user profile
//route put / api/users/profile
//@access Private
const updateUserProfile = async(req,res)=>{
    const user = await User.findById (req.user._id);
    if(user) {
        user.username = req.body.username || user.username ;
        user.email = req.body.email || user.email;
        
        if(req.body.password){
            user.password = req.body.password;

        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            username : updatedUser.username,
            email: updatedUser.email
        })
        console.log('user updated')
    }else{
        res.status(404);
        throw new Error('User not found')
    }
  
}

const updateUserImage = async(req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            res.status(401);
            throw new Error ('Unauthorized')
            
        }

        user.profileImage = `/uploads/${req.file.filename}`;
        const updatedUser = await user.save();
        res.status(201).json({ message:'image uploaded successfully' ,data:{
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            profileImage : updatedUser.profileImage
        } })

    } catch (error) {
        res.status(404);
        console.log(error.message)
       // throw new Error ('Image upload failed')
    }
   

}


export { authUser , registerUser, logoutUser, getUserProfile, updateUserProfile ,updateUserImage}