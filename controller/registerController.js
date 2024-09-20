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
            console.log("Email already exists");
            return res.status(400).json({success:false,msg:"Email Id already exists"})
        }

        const newUser = await Register.create({
            name,
            email,
            password,
            phone,
        });
        console.log("User registered successfully");
        return res.status(200).json({success:true,msg:"User registered successfully",newUser});

    }
    catch (error){
        console.log(error);
        return res.status(500).json({success:false,msg:"Internal server error"});
    }
}

export const getAllUsers = async(req,res)=>{
    try{
        const users = await Register.find({});
        return res.status(200).json({success:true,users});
    }
    catch (error){
        console.log(error);
        return res.status(500).json({success:false,users});
    }
}

export const updateUser = async(req,res)=>{
    try{
        const userId = req.params.userId;
        const {name,email,phone} = req.body;

        const user = await Register.findOneAndUpdate({userId},{
            name,
            email,
            phone,
        });

        if(!user){
            console.log("user not found");
            return res.status(404).json({success:false,msg:"user not found"});
        }

        return res.status(200).json({success:true,msg:"user updated successfully"});

    }
    catch (error){

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
    //logger.info(error);
    //console.log(error);
    logError(error);
    return res.status(500).json({success:false,msg:"internal server error"});
}
}

export const deleteUser = async(req, res)=>{
    try{
        const userId = req.params.userId;

        const deleteDoc = await Register.findOneAndDelete({_id:userId});

        if(deleteDoc){
            return res.status(200).json({success:true,msg:"Deleted successfully"});
        }

        console.log("user not found");
            return res.status(404).json({success:false,msg:"user not found"});
    }
    catch (error){

    }
}

export const changePassword = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const {newPassword} = req.body;
        console.log(userId,newPassword);
        const userDoc = await Register.findById(userId);
        if(!userDoc){
            console.log("User id not valid "+userId);
            return res.status(400).json({success:false,msg:"user id not valid "+userId})
        }
        
        userDoc.password = newPassword;
    
        await userDoc.save();
        console.log("success");
        return res.status(200).json({success:true,msg:"Password updated successfully"})

    } 
    catch (error){
        console.log(error);
        return res.status(500).json({sucess:false,msg:"internal server error"});
    }
}

export const createUser = async(req, res)=>{
    try{
        const {name, email, phone, password, username}= req.body;
        const user = await Register.findOne({email:email});

        if(user){
            console.log("Email id already exists");
            return res.status(400).json({success:false,msg:"Email already exists"});
        }

        const newUser = await Register.create({
            name,
            email,
            phone,
            password,
            username
        })
        console.log("user created successfully");
        return res.status(200).json({success:true,msg:"user created successfully"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,msg:"internal server error"});
    }
}

export const login = async(req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await Register.findOne({email:email});
        
        if(!user){
            console.log("Email not found");
            return res.status(400).json({success:false,msg:"Email not found"});
        }

        //const isMatch = await bcrypt.compare(password, user.password);
        if(user && (await user.matchPassword(password))){
            res.status(200).json({success:true,msg:"Login successfull",user});
        }
        else{
            res.status(400).json({success:false,msg:"incorrect password"});
        }
        // if(!isMatch){
        //     console.log("Password not matched");
        //     return res.status(400).json({success:false,msg:"Password not matched"});
        //     }
    }
    catch (error){
        console.log(error);
        return res.status(500).json({success:false,msg:"internal server error"});
    }
}