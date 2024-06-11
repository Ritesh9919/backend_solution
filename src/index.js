import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import {connectDB} from './db/index.js';
import {errorHandlerMiddleware}from './middlewares/errorHandler.middleware.js'

import authRouter from './routes/auth.route.js';



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));




app.get('/', (req, res)=>{
    res.send("Hello World");
})

app.use('/api/auth', authRouter);

app.use(errorHandlerMiddleware);

connectDB()
.then(()=> {
    app.listen(process.env.PORT || 8000, ()=> {
        console.log(`Server is running on port:${process.env.PORT}`);
    })
})
.catch((err)=> {
    console.log("MongoDB connection failed", err);
})