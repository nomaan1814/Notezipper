const express=require('express');
const {getNotes,creteNotes,getNoteById, updateNote, deleteNote} = require('../controllers/notesController');
const protect = require('../middlewares/authMiddleware');
const router=express.Router();
router.route('/').get(protect,getNotes)
router.route('/create').post(protect,creteNotes)
router.route('/:id').get(protect,getNoteById).put(protect,updateNote).delete(protect,deleteNote)
module.exports=router;