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
        return await Course.findByIdAndUpdate(courseid,body);
    }
    
}
module.exports = new CourseModule();