const portNumber = 3000;
const express = require('express');
const app = express();
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended : false}));
app.use(body_parser.json());

const userRoutes = require('./routes/user.routes');
app.use('/user', userRoutes);

const courseRoutes = require('./routes/course.routes');
app.use('/course', courseRoutes);


app.listen(portNumber,()=>{
    console.log(`Server is running on port ${portNumber}`);
});