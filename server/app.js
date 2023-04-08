const express = require('express');
const cors = require('cors');

const app = express();
const userRoutes = require("./routes/userRoutes")

// CORS Options
const corsOptions ={
    origin:'http://localhost:3000', 
    allowedMethods: ['GET', 'POST', 'PUT'],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// body parser
app.use(express.json({ limit: '10kb' }));

// get forms data
app.use(express.urlencoded({extended: true, limit: '10kb'}))

// user routes
app.use('/api/user', userRoutes)

module.exports = app