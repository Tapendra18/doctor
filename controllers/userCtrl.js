const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//login callback
const loginController = async(req , res)=>{
    try{
        const user = await userModel.findOne({
            email:req.body.email
        })
        if(!user){
            return res.status(200).send({
                message:'user not found',
                success:false
            })
        }
        const isMatch =await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(200).send({
                message:"invalid Email or password",
                success:false
            })
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET , {expiresIn:'1d'})
        res.status(200).send({
            message:'login Success',
            success:true,
            token
        })
    }catch(err) {
        console.log(err);
        res.status(500).send({
            message:`Error in login Ctrl ${err.message}`,
            success:false
    })
    }
}
//register caallback
const registerController = async(req, res) =>{
    try{
       const existingUser = await userModel.findOne({
        email:req.body.email
       }) 
       if(existingUser){
        return res.status(200).send({
            message:'user Already Exist',
            success:false
        })
       }
       const password = req.body.password
       const salt = await bcrypt.genSalt(10);
       const hashpassword = await bcrypt.hash(password,salt);
       req.body.password = hashpassword;
       const newUser = new userModel(req.body)
       await newUser.save()
       res.status(201).send({
        message:'Register Successfully' ,
        success:true
       })
    }catch(err){
            console.log(err);
            res.status(500).send({
                success:false, 
                msg:`register controller ${err.msg}`});
    }
}

const authController = async(req , res) => {
    try{

        const user = await userModel.findOne({_id:req.body.userId})
        if(!user){
            return res.status(200).send({
                message:'user not found',
                success:false
            })
        }else{
            res.status({
                success:true,
                data:{
                    name:user.name,
                    email:user.email
                }
            })
        }

    }catch (err) {
        console.log(err);
        res.status(500).send({
            message:'auth error',
            success:false,
            err
        })
    }
}

module.exports ={loginController , registerController ,authController};