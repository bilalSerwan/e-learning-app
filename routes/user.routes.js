const express = require('express');
const app = express();
const UserController = require('../controller/user.controller');

app.get('/get-user',UserController.getUserById());

app.post('/add-user',UserController.addUser());

app.put('/update-user',UserController.updateUser());

module.exports = app;