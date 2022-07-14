const asyncHandler=require('express-async-handler')
const noteModel = require('../models/noteModel')

const getNotes=asyncHandler(async(req,res)=>{
    const notes=await noteModel.find();
    res.json(notes)
})
const creteNotes=asyncHandler(async(req,res)=>{
    const {title,content,category}=req.body;
    if(!title || !content || !category){
        res.status(400);
        throw new Error('Please fill all the fields')
    }
    else{
        const note=new noteModel({
            user:req.user._id,
            title,content,category
        })
         const createdNote=await note.save();
         res.status(201).json(createdNote)
    }
})
const getNoteById=asyncHandler(async(req,res)=>{
      let id=req.params.id;
      const note=await noteModel.findById(id);
      if(note){
        res.json(note)
      }
      else{
        res.status(404).json({message:'Not found'})
      }
})
const updateNote =asyncHandler(async(req,res)=>{
    let id=req.params.id;
    const {title,content,category}=req.body;
    const note=await noteModel.findById(id);
    if(note){
        if(note.user.toString()!=req.user._id.toString()){
            res.status(401);
            throw new Error("You can't perform this action");
        }
        else{
            note.title=title;
            note.content=content;
            note.category=category;
            const updatedNote=await note.save();
            res.json(updatedNote)
        }
      }
      else{
        res.status(404).json({message:'Not found'})
      }
})
const deleteNote=asyncHandler(async(req,res)=>{
    let id=req.params.id;
      const note=await noteModel.findById(id);
      if(note){
        if(note.user.toString()!=req.user._id.toString()){
            res.status(401);
            throw new Error("You can't perform this action");
        }
        else{
       const deletedNote=await noteModel.findByIdAndDelete(id);
       res.json({
        message:"Deleted successfully"
       })
    }
      }
      else{
        res.status(404).json({message:'Not found'})
      }
})
module.exports={getNotes,creteNotes,getNoteById,updateNote,deleteNote};