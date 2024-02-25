const {
    string
} = require('joi');
const Course = require('../document_schema/course_schema');
const {
    search
} = require('../routes/user.routes');
const CourseValidation = require('../validation/course.validation');

class CourseController {

    //this route for home page 
    getAllCourses = () => {
        return async (req, res) => {
            const result = await Course.find().populate('author', 'firstname lastname image').sort({
                numberOfStudents: -1
            });
            res.send(result);
        }
    }
    //add course
    addCourse = () => {
        return async (req, res) => {
            const body = req.body;
            const isvalid = await CourseValidation.validateCourse(body);
            if (isvalid.status) {
                try {
                    const result = await Course.create(body);
                    res.send(result);
                } catch (e) {
                    console.log(e);
                }
            } else {
                res.send(isvalid.massage);
            }
        }
    }

    searchCourse = () => {
        return async (req, res) => {
            const searched = req.params.search;
            const regulerEx = new RegExp('.*' + searched + '.*', 'i');
            const result = await Course.find({
                name: {
                    $regex: regulerEx,
                }
            });
            console.log(result);
            res.send(result);
        }
    }

}
module.exports = new CourseController();