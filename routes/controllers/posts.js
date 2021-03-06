
import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const createPost = async (req, res) => { 
    const post = req.body;
    const newPost = new PostMessage({ ...post,creator:req.userId,createdAt:new Date().toISOString()});
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}
export const updatePost = async (req, res) => { 
    const {id : _id} = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that ID");
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,post ,{new : true});
    res.json(updatedPost);
}

export const deletePost = async(req,res) => {
    const {id : _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    //await PostMessage.findByIdAndDelete(_id);
    PostMessage.deleteOne(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Offer Deleted!'});
            console/log("deleted")
    });
    res.json({message:'Post deleted successfully'});
}