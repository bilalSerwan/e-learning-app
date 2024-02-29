const ObjectId = require('mongoose').Types.ObjectId;
const userValidation = require('../validation/user.validation');
const userModule = require('../module/user.module');

class UserController {
    //get-user-by-id
    getUserById = () => {
        return async (req, res) => {
            if (req.params.id.length != 24) {
                res.json({
                    "data": "this id is inviled or wrong"
                });
                return;
            }
            const id = new ObjectId(req.params.id);
            res.json({
                data: await userModule.getUserById(id)
            });
        };
    }

    //get user by email
    getuserbyemail = () => {
        return async  (req, res) => {
            console.log(req.params.email);
            const email = req.params.email;
            console.log(email);
            const emailValid = await userValidation.isEmailValid(email);
            // console.log("emailValid ================>");
            if (true) {
                res.json({
                    "data": await userModule.getUserByEmail(email)
                });
            } else {}
        }
    }

    //add-user
    addUser = () => {
        return async (req, res) => {
            const body = req.body;
            const userisvalid = await userValidation.isuserValidate(body);
            if (userisvalid.status) {
                try {
                    const result = await userModule.addUser(body);
                    res.json({
                        "data": result
                    });
                } catch (ex) {
                    console.log(ex);
                }

            } else {
                res.json({
                    "data": userisvalid.massage
                });
            }
        }
    }

    //update user
    updateUser = () => {
        return async (req, res) => {
            if (req.body._id.length != 24) {
                res.json({
                    "data": "Invalid Id"
                });
                return;
            }
            const id = new ObjectId(req.body._id);
            const body = req.body;
            const userisvalid = await userValidation.isuserValidate({
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: body.password
            });
            if (userisvalid.status) {
                try {
                    res.json({
                        "data": await userModule.updateUser(id, body)
                    });
                } catch (ex) {
                    console.log(ex);
                }
            } else {
                res.json({
                    "data": userisvalid.massage
                });
            }
        }
    } //update-method

} //class
module.exports = new UserController();