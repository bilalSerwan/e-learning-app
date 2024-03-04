const CourseModule = require('../module/course.module');
const CourseValidation = require('../validation/course.validation');

class CourseController {

    //this route for home page 
    getAllCourses = () => {
        console.log("get All Courses");
        return async (req, res) => {
            res.send(await CourseModule.getAllCourses());
        }
    }
    //add course
    addCourse = () => {
        console.log("add course method =============>Run<============");
        return async (req, res) => {
            const body = req.body;
            const isvalid = await CourseValidation.validateCourse(body);
            if (isvalid.status) {
                try {
                    res.send(await CourseModule.addCourse(body));
                } catch (e) {
                    console.log(e);
                }
            } else {
                res.send(isvalid.massage);
            }
        }
    }
    //this for search to course 
    searchCourse = () => { 
        console.log("Search Course method =============>Run<============");
        return async (req, res) => {
            const searched = req.params.search;
            const regulerEx = new RegExp('.*' + searched + '.*', 'i');
            try {
                res.send(await CourseModule.searchForCourse(regulerEx));
            } catch (ex) {
                console.log(ex);
            }
        }
       }
}
module.exports = new CourseController();