import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config();
const port = process.env.PORT || 5000

import connectDB from './config/db.js';

import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'

import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';


connectDB(); 
const app = express();

// Get the full path of the current file
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current file
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.use(express.json());
app.use(express.urlencoded({ extended : true}))

app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/admin' , adminRoutes)

app.use(notFound)
app.use(errorHandler) 


                 
 


app.listen(port, ()=>{
    console.log('server started on port' + port)
})