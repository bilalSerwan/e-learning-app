const CourseModule = require('../module/course.module');
const CourseValidation = require('../validation/course.validation');
const ObjectId = require('mongoose').Types.ObjectId;

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
            const body =JSON.parse (req.body.data);
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

       searchCourseByAuthorId=()=>{
        console.log("Search Course by auther ID method =============>Run<============");
        return async (req, res) => {
            const authorid = req.params.id;
            try {
                res.send(await CourseModule.searchForCourseByAuthorId(authorid));
            } catch (ex) {
                console.log(ex);
            }
        }
       }
       
       deleteCourseById=()=>{
        return async (req,res)=>{
            console.log('delete course by id'+req.params.courseid);
            if (req.params.courseid.length != 24) {
                res.json({
                    "data": "this id is inviled or wrong"
                });
                return;
            }
            const courseid = new ObjectId(req.params.courseid);
            try {
                res.send(await CourseModule.deleteCourseById(courseid));
            } catch (ex) {
                console.log(ex);
            }
        }
       }

       updateCourseById=()=>{
        return async (req,res)=>{
            if (req.params.courseid.length != 24) {
                res.json({
                    "data": "this id is inviled or wrong"
                });
                return;
            }
            const courseid = new ObjectId(req.params.courseid);
            // const body = JSON.parse (req.body.data);
            const body = req.body;
            const isvalid = await CourseValidation.validateCourseForUpdateCourse(body);
            if(isvalid.status){
            try {
                res.send(await CourseModule.updateCourseById(courseid,body));
            } catch (ex) {
                console.log(ex);
            }
        }else{
            res.send(isvalid.massage);
        }
        }
       }
}
module.exports = new CourseController();