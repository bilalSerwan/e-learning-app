const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/e-learning-app').then(
    ()=>{
        console.log("Connected to MongoDB...");
    }
).catch(e=>console.log(e));

module.exports = mongoose;