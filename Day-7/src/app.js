 const express = require('express');
const app = express();
const authRouter = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());

//api/auth
app.use('/api/auth',authRouter);







module.exports = app;