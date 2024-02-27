const express = require('express');
const app = express();
const UserController = require('../controller/user.controller');

app.get('/get-user-by-id/:id',UserController.getUserById());

app.get('/get-user-by-email/:email',UserController.getuserbyemail());

app.post('/add-user',UserController.addUser());

app.put('/update-user',UserController.updateUser());

module.exports = app;