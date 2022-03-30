import bcrypt from 'bcryptjs';
import json from 'body-parser';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async(req,res) => {
    const {email,password} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message : "User doesn't exist"});
        const isCorrectPassword = await bcrypt.compare(password,existingUser.password);
        if(!isCorrectPassword) return res.status(400).json({message:"Wrong password"});

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:"1h"} ); // second paramter is a secret.
        res.status(200).json({result : existingUser,token});
        
    }
    catch{
        res.status(500).json({message:'Error in fetching details'});
    }
}

export const signup = async(req,res) => {
    const {email,password,firstName,lastName,confirmPassword} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message : "User already exists"});
        } 
        else if(password != confirmPassword) {
            //return res.status(400).json({message : "Password dont match"});
            const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message : "User already exists"});
        } 
        else{
            return res.status(400).json({message:"Passed"});
        }
        }
        else{
        const hashedPassword = await bcrypt.hash(password,12); // second param stands how difficult you want the password .
        const result = await User.create({email,password:hashedPassword,name: `${firstName} ${lastName}`}); // creaye the user 
        const token = jwt.sign({email:result.email,id:result._id},'test',{expiresIn:"1h"} ); // second paramter is a secret.
        res.status(200).json({result,token});
        }
    }
    catch{
        res.status(500).json({message:'User unable to create'});
    }
}