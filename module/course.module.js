const Course = require('../document_schema/course_schema');

class CourseModule {
    getAllCourses = async () => {
        return await Course.find().populate('author', 'firstname lastname image').sort({
            numberOfStudents: -1
        });
    }
    addCourse = async (body) => {
        return await Course.create(body);
    }

    searchForCourse = async (regulerEx) => {
        return await Course.find({
            name: {
                $regex: regulerEx,
            }
        });
    }
    searchForCourseByAuthorId = async (id) => {
        return await Course.find({
            author:id
        });
    }

    deleteCourseById = async(courseid)=>{
       return  await Course.deleteOne({_id:courseid});
    }
    updateCourseById = async(courseid,body)=>{
        return await Course.updateOne({'_id':courseid},body);
    }

    enrollCourse=async(courseId,userId)=>{
         var res =await Course.find({_id:courseId});
         if(Object.keys(res).length==0){
            return 'The Course is not found';
         }else{
            for(var i=0; i<res[0].Students.length; i++)
               if(JSON.stringify(res[0].Students[i])===JSON.stringify(userId)){
                   return 'You are already enrolled in this course';
               }
         res[0].Students.push(userId);
        return await Course.updateOne({'_id':courseId},{Students:res[0].Students,numberOfStudents:res[0].numberOfStudents+1},);
         }
        }
    
}
module.exports = new CourseModule();