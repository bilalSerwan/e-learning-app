const User = require('../document_schema/user_schema');
const { set } = require('../routes/user.routes');
const ObjectId = require('mongoose').Types.ObjectId;
const userValidation = require('../validation/user.validation');

class UserController {
    //get-user
    getUserById = () => {
        return async (req, res) => {
            const id = new ObjectId(req.body._id);
            const result = await User.findById(id);
            res.send(result);
        };
    }
    getuserbyemail = () => {
        return async (req,res)=>{
            const email = req.body.email;
            const result = await User.findOne({email:email});
            if(!result){
                res.send('this email is invalid doesn\'t exists');
                return;
            }
            res.send(result);
        }
    }
    //add-user
    addUser = () => {
        return async (req, res) => {
            console.log("add-user");
            const body = req.body;
            const userisvalid = await userValidation.isuserValidate(body);
            if (userisvalid.status) {
                try {
                    const user = new User(body);
                    const result = await user.save();
                    res.send(result);
                } catch (ex) {
                    console.log(ex);
                }
            } else {
                res.send(userisvalid.massage);
            }
        }
    };

    updateUser = () => {
        return async (req, res) => {
            console.log(req.body);
            const id = new ObjectId(req.body[0]._id);
            const body = req.body[1];
            const userisvalid = await userValidation.isuserValidate(body);
            if (userisvalid.status) {
                try {
                    const result = await User.updateOne({_id:id},{$set:body});
                    res.send(result);
                } catch (ex) {
                    console.log(ex);
                }
            } else {
                res.send(userisvalid.massage);
            }
        }
    }//update-method
}//class
module.exports = new UserController();