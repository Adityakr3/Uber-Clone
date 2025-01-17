const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captionRoutes = require('./routes/caption.routes');
const recaptchaRoutes = require('./routes/recaptcha.routes');

connectToDb();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware to log request body
app.use((req, res, next) => {
    console.log('Request Body:', req.body);
    next();
});

app.get('/users', (req, res) => {
    res.send('Hello World');
});

app.use('/users', userRoutes);
app.use('/captions', captionRoutes);
app.use('/api', recaptchaRoutes);

module.exports = app;