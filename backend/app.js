const express=require('express');
const notes = require('./data/notes');
const dotenv=require('dotenv')
const app=express();
const cors=require('cors');
dotenv.config();
const connectDb=require('./database/db');
const userRoutes=require('./routes/userRoutes');
const { notfound, errorHandler } = require('./middlewares/errorMiddleware');
const noteRoutes=require('./routes/notesRoute');

connectDb();
app.use(express.json())
app.use(cors());
const PORT=process.env.PORT || 5000;

// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
// app.get('/api/notes',cors(corsOptions),(req,res)=>{
//     res.json(notes)
// })
app.use('/api/notes',noteRoutes)
app.use('/api/users',userRoutes)
app.use(notfound);
app.use(errorHandler)



app.listen(PORT,console.log('Server started on',PORT));