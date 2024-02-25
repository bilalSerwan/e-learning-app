const mongoose = require('../connect_to_db');

const courseSchema = mongoose.Schema({
   name : {
    type : String,
    minlength : 5,
    maxlength : 100,
    required : true,
    trim : true,
   } ,
   backgroundImage : {type : String, default : 'https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1708732800&semt=ais'},
   author : {
       type : mongoose.Schema.Types.ObjectId,
       ref : 'User',
       required : true,
       trim : true,
   },
   videos : {
    type : [String],
   },
   description : {
    type : String,
    minlength : 5,
    required : true,
    trim : true,
   },
   price : {
       type : Number,
       default : 0,
       min : 0,
   },

   numberOfStudents : {
       type : Number,
       default : 0,
       min : 0,
   },
//    Category : {
//     type : [String],
//     required : true,
//    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;