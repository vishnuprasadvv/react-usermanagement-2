import User from '../models/userModel.js'
import generateAdminToken from '../utils/generateAdminToken.js';

 
const adminLogin = async(req, res) => {
    const { email , password }  = req.body;
    try {
        const admin = await User.findOne({email , role:'admin'});
        if(!admin){
            res.status(401)
            throw new Error ('Not autherized')
        }

        if(admin && await admin.matchPassword(password)){
            generateAdminToken(res, admin._id)
            res.status(201).json({message : 'admin login success fully' , data: {
                id : admin._id,
                name : admin.username,
                email: admin.email,
                profileImage : admin.profileImage
            }})
        }else{
            res.status(401);
            throw new Error('Wrong credentials')
        }
       
        
    } catch (error) {
        res.status(500)
        .json(error.message)
    }
}


//admin logout 

const adminLogout = (req, res) => {
    try {
        
        res.cookie('jwt_admin', '' , {
            httpOnly : true,
            expires: new Date(0)
        })

        res.status(200).json({message: 'admin logged out'})

    } catch (error) {
        res.json(error.message)
    }
    
}


//get all users 
 const getAllUsers = async (req, res) => {
    console.log('userlist')
    const search = req.query.search || '';
   let users = await User.find({ username: { $regex: search, $options: 'i' } , role:{$ne:'admin'}}).select('-password');
    res.json(users);
  };

  //create user
  const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    
    const user = new User({
      username,
      email,
      password
    })
    
    await user.save();

    res.json({message: 'New user created' ,data: user});
  
    console.log('new user created')
  };

  const deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
    console.log('user deleted')
  };

  //edit user 

  const editUser = async(req, res ) => {
    const {id} = req.params;
    const {username, email } = req.body;
    try {
        const user = await User.findById(id);
        if(!user){
            res.status(404);
            throw new Error('User not found')
        }

        
        if(username !== '' && email !== ''){
            user.username = username;
            user.email = email;

           const updatedUser = await user.save()
           console.log(updatedUser)
           res.status(201).json({message:'User details updated'})
        }else{
            res.status(401)
            throw new Error('No input data found')
        }
    } catch (error) {
        res.json(error.message)
    }
  }
   
  const editUserGet = async(req, res ) => {
    const {id} = req.params;
    try {
        const user = await User.findById (id).select('-password');
        if(!user){
            res.status(404)
            throw new Error('user not found')
        }

        res.status(201) .json(user)
    } catch (error) {
        res.json(error.message)
    }
  }

export { adminLogin , adminLogout , getAllUsers , createUser, deleteUser, editUser , editUserGet}