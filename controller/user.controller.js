const ObjectId = require('mongoose').Types.ObjectId;
const userValidation = require('../validation/user.validation');
const userModule = require('../module/user.module');

class UserController {
    //get-user-by-id
    getUserById = () => {
        console.log("get user by id method =============>Run<============");
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
            console.log("get user by  email method =================>Run<================");
            const email = req.params.email;
            const emailValid = await userValidation.isEmailValid(email);
            if (emailValid.status) {
               let  data =  await userModule.getUserByEmail(email);
               if(data == false){
                res.json(
                    {
                        "status": false,
                        "data": "this email is inviled or wrong",
                    }
                )
                return;
               }
                res.json({
                    "status": true,
                    "data": data,
                });
            } else {
                res.json(
                    {
                        "status": false,
                        "data": "this email is inviled or wrong",
                    }
                )
            }
        }
    }

    //add-user
    addUser = () => {
        console.log("add user method =============>Run<============");
        return async (req, res) => {
            const body = JSON.parse(req.body.data);
            const userisvalid = await userValidation.isuserValidate(body);
            if (userisvalid.status) {
                try {
                    const result = await userModule.addUser(body);
                    if(result == false){
                        res.json({
                            "status":false,
                            "data": 'this email is already exsist',
                        });
                    }
                    res.json({
                        "status" : true,
                        "data": result
                    });
                } catch (ex) {
                    console.log(ex);
                }

            } else {
                res.json({
                    "status":false,
                    "data": userisvalid.massage
                });
            }
        }
    }

    //update user
    updateUser = () => {
        console.log("updatre user method =============>Run<============");
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