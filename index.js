const portNumber = 3000;
const express = require('express');
const app = express();
app.use(express.json());

const userRoutes = require('./routes/user.routes');
app.use('/user', userRoutes);

const courseRoutes = require('./routes/course.routes');
app.use('/course', courseRoutes);


app.listen(portNumber,()=>{
    console.log(`Server is running on port ${portNumber}`);
});