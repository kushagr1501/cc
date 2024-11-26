//mongodb connection

import mongoose from "mongoose";
import  app from './src/app.js'
import config from './src/config/index.js';
(async () => {
    try {
        await mongoose.connect(config.MONGODB_URL);
        console.log("connected");

        app.on('error', (err) =>  {
            console.log("error" + err);
            throw err; 
        }); 

        app.listen(config.PORT, () => {
            console.log(`listening on port ${config.PORT}`);
        });


    }
    catch(error){
        console.log("Failed to connect to MongoDB", error);
        process.exit(1);  // Exit the process with failure
    }


})()