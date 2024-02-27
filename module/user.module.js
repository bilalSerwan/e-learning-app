const { object } = require('joi');
const User = require('../document_schema/user_schema');
class Usermodule {
  getUserById = async (id) => {
    const result = await User.findById(id);
    if (!result) {
      return 'this id is invalid doesn\'t exists';
    }
    return result;

  } //get user by id-method

  getUserByEmail = async (email) => {
    console.log(email);
   try{ 
      const result = await User.findOne({
      email: object.base(email),
    });
    console.log("result =====================>" + result);
    if (!result) {
      return 'this email is invalid doesn\'t exists';
    }}catch(ex){console.log(ex);}
    return result;
  } //getuserbyemail-method

  addUser = async (body) => {
    const result = await User.create(body);
    console.log("result ===================>" + result);
    return result
  } //add User-method

  updateUser = async (id, body) => {
    const result = await User.updateOne({
      _id: id
    }, {
      $set: body
    });
    return result;
  } //update user-method

}

module.exports = new Usermodule();