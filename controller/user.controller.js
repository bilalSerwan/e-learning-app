const ObjectId = require('mongoose').Types.ObjectId;
const userValidation = require('../validation/user.validation');
const userModule = require('../module/user.module');

class UserController {
    //get-user
    getUserById = () => {
        return async (req, res) => {
            const id = new ObjectId(req.body._id);
            res.send(await userModule.getUserById(id));
        };
    }
    //get user by email
    getuserbyemail = () => {
        return async (req, res) => {
            const email = req.body.email;
            const emailValid = await userValidation.isEmailValid(email);
            if(emailValid.status){
                res.send(await userModule.getUserByEmail(email));
            }else{
                res.send(emailValid.massage);
            }
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
                    res.send(result);
                } catch (ex) {
                    console.log(ex);
                }

            } else {
                res.send(userisvalid.massage);
            }
        }
    };
    //update user
    updateUser = () => {
        return async (req, res) => {
            const id = new ObjectId(req.body[0]._id);
            const body = req.body[1];
            const userisvalid = await userValidation.isuserValidate(body);
            if (userisvalid.status) {
                try {
                    res.send(await userModule.updateUser(id, body));
                } catch (ex) {
                    console.log(ex);
                }
            } else {
                res.send(userisvalid.massage);
            }
        }
    } //update-method
} //class
module.exports = new UserController();