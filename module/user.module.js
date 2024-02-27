const User = require('../document_schema/user_schema');


class Usermodule {

  getUserById = async (id) => {
    if(length(id)!=24) return " this id is wrong "; 
    const result = await User.findById(id);
    if (!result) {
      return 'this id is invalid doesn\'t exists';
    }
    return result;

  }
  getUserByEmail = async (email) => {
    console.log(email);
    const result = await User.findOne({
      email: email
    });
    console.log("result =====================>" + result);
    if (!result) {
      return 'this email is invalid doesn\'t exists';
    }
    return result;
  } //getuserbyemail-method

  addUser = async (body) => {
    const result = await User.create(body);
    console.log("result ===================>" + result);
    return result
  } //add User

  updateUser = async (id,body)=>{
    const result = await User.updateOne({
      _id: id
  }, {
      $set: body
  });
  return result;
  }

}

module.exports = new Usermodule();