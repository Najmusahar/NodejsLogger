import { response } from "express";
import Register from "../model/registeration.js";
import mongoose from "mongoose";
import { logError, logger } from "../util/logger.js";
//Registeration

export const register = async(req,res)=>{
    try{
        const {name, email, password, phone}=req.body;

        const userDoc = await Register.findOne({email:email});

        if(userDoc){
            logger.error("Email already exists");
            return res.status(400).json({success:false,msg:"Email Id already exists"})
        }

        const newUser = await Register.create({
            name,
            email,
            password,
            phone,
        });
        logger.info("User registered successfully");
        return res.status(200).json({success:true,msg:"User registered successfully",newUser});

    }
    catch (error){
        logError(error);
        return res.status(500).json({success:false,msg:"Internal server error"});
    }
}

export const getAllUsers = async(req,res)=>{
    try{
        const users = await Register.find({});
        logger.info(users);
        return res.status(200).json({success:true,users});
    }
    catch (error){
        logError(error);
        return res.status(500).json({success:false,users});
    }
}

export const update = async(req,res)=>{
    try{

    const userId = req.params.userId;
    const {name,email,phone} = req.body;

    let user = await Register.findById(userId);

    if(!user){
        logger.error("User not found");
        //console.log("User not found");
        return res.status(404).json({success:false,msg:"user not found"});
    }

    user = await Register.updateOne({_id:userId},{
        name,
        email,
        phone
    })

    logger.info({user,msg:"user updated successfully"});
    return res.status(200).json({success:true,msg:"user updated successfully"});
}
catch (error){
    //console.log(error);
    logError(error);
    return res.status(500).json({success:false,msg:"Internal server error"});
}
}

export const deleteUser = async(req, res)=>{
    try{
        const userId = req.params.userId;

        const deleteDoc = await Register.findOneAndDelete({_id:userId});

        if(deleteDoc){
            logger.info("Deleted Successfully");
            return res.status(200).json({success:true,msg:"Deleted successfully"});
        }

        logger.error("user not found");
            return res.status(404).json({success:false,msg:"user not found"});
    }
    catch(error){
        logError(error);
        return res.status(500).json({success:false,msg:"Internal server error"});
    }
}

export const changePassword = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const {newPassword} = req.body;

        const userDoc = await Register.findById(userId);
        if(!userDoc){
            logger.error("User id not valid ",userId);
            return res.status(400).json({success:false,msg:"user id not valid "+userId})
        }
        
        userDoc.password = newPassword;
    
        await userDoc.save();
        logger.info("password changed successfully");
        return res.status(200).json({success:true,msg:"Password updated successfully"});

    } 
    catch (error){
        logError(error);
        return res.status(500).json({sucess:false,msg:"internal server error"});
    }
}

export const login = async(req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await Register.findOne({email:email});
        
        if(!user){
            logger.error("Email not found");
            //console.log("Email not found");
            return res.status(400).json({success:false,msg:"Email not found"});
        }

        if(user && (await user.matchPassword(password))){
            logger.info("Login successfull");
            res.status(200).json({success:true,msg:"Login successfull",user});
        }
        else{
            logger.info("Incorrect password");
            res.status(400).json({success:false,msg:"incorrect password"});
        }
        
    }
    catch (error){
        logError(error);
        //console.log(error);
        return res.status(500).json({success:false,msg:"internal server error"});
    }
}