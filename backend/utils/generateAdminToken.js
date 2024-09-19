import jwt from 'jsonwebtoken'

const generateAdminToken = (res, adminId) => {
    const token = jwt.sign ({adminId}, process.env.JWT_SECRET, {expiresIn: '1d'});


    res.cookie ('jwt_admin', token , {
        httpOnly : true ,
        secure : process.env.NODE_ENV !== 'development',
        sameSite : 'strict',
        maxAge : 24 * 60 * 60 * 1000
    })
}

export default generateAdminToken;