const mongoose = require('../connect_to_db');

const userSchema = mongoose.Schema({
    firstname :{
        type : String,
        minlength : 1,
        maxlength : 25,
        required : true,
        trim : true,
    },
    lastname :{
        type : String,
        minlength : 1,
        maxlength : 25,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        minlength : 5,
        maxlength : 100,
        required : true,
        trim : true,
        unique : true, 
    },
    password: {
        type : String,
        minlength : 8,
        maxlength : 25,
        required : true,
        trim : true,
    },
    image: {
        type : String,
        default : "https://www.w3schools.com/howto/img_avatar.png"
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;