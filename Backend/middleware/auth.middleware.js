const jwt = require('jsonwebtoken')
// const tokenModel = require('../models/blacklist.model')


async function User(req,res,next){
    const token = req.cookies.token

    // if(!token){
    //     return res.status(401).json({
    //         message:"Token not found"
    //     })
    // }

    // const isTokenBlackList = await tokenModel.findOne({
    //   token  
    // })

    // if(!isTokenBlackList){
    //     return res.status(401).json({
    //         message:"Token Invalid"
    //     })
    // }

    try{
    const decoded = jwt.verify(token, process.env.JWT_SCRETE)

    req.user = decoded
    next();

    }catch(error){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}   


module.exports = {User}