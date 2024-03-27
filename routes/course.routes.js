const express = require('express');
const app = express();
const CourseController = require('../controller/course.controller');

//this route for home page and get all courses
app.get('/home',CourseController.getAllCourses());

//add-course
app.post('/add-course',CourseController.addCourse());

app.get('/searchcourse/:search',CourseController.searchCourse());

app.get('/search-course-by-authorid/:id',CourseController.searchCourseByAuthorId());
app.delete('/delete-course-by-id/:courseid',CourseController.deleteCourseById());
app.put('/update-course-by-id/:courseid',CourseController.updateCourseById());
app.post('/enroll-course/:courseId/:userId',CourseController.enrollCourse());
module.exports= app;