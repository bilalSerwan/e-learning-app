const express = require('express');
const app = express();
const CourseController = require('../controller/course.controller');

//this route for home page and get all courses
app.get('/home',CourseController.getAllCourses());

//add-course
app.post('/add-course',CourseController.addCourse());

app.get('/searchcourse/:search',CourseController.searchCourse());
module.exports= app;