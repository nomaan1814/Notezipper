const express=require('express');
const router=express.Router();
const {registerUser, loginUser, userUpdateProfile, image_retreive}=require('../controllers/userController');
const multer=require('multer');
const path=require('path');
const protect = require('../middlewares/authMiddleware');
let img='';
const storage=multer.diskStorage({
    destination:path.join(__dirname,'../public/','uploads'),
    filename:function(req,file,cb){
        const name = file.originalname.split('.')[0];
        console.log(name)
        cb(null,Date.now()+'-'+name+path.extname(file.originalname))
    }
})
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Not an image please upload an image'), false);
    }
}

const upload=multer({
    storage:storage,
    fileFilter:fileFilter
})

router.route('/').post(upload.single('pic'),registerUser);
router.route('/login').post(loginUser);
router.route('/profile').post(upload.single('pic'),protect,userUpdateProfile)
router.route('/img/:img').get(image_retreive);

module.exports=router;