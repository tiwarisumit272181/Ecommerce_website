const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

//handle the uncaught exceptions

process.on('uncaughtException',err=>{
    console.log( `ERROR:${err.message}`);
    console.log("Shutting down server due to uncuaght exception");
    process.exit(1); 
});

//setting config file
dotenv.config({path:'backend/config/config.env'});

//connecting database
connectDatabase();

//setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})


const server=app.listen(process.env.PORT,()=>{
    console.log(`Server started at port : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});


//handle unhandled promise rejection

process.on('unhandledRejection',err=>{
    console.log(`ERROR:${err.message}`);
    console.log('Shutting down the server due to unhandled Promise Rejection');
    server.close(()=>{
        process.exit(1)
    })
})

