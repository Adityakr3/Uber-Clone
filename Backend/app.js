const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser')
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captionRoutes = require('./routes/caption.routes');
connectToDb()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get('/users',(req , res)=>{
    res.send('Hello World');
});

app.use('/users', userRoutes)
app.use('/captions', captionRoutes)



module.exports = app;