const express = require('express');
const userRoute = require('./routes/user-route');
const apiRouter = require('./routes/data-route')
mongoose= require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testDB')
app = express();
app.use(express.json() );
app.use(userRoute);
app.use(apiRouter);

//console.log("listenning...")
app.listen(8080 , ()=>console.log("listening..."));