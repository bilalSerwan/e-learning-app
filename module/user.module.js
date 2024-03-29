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
    let result;
   try{ 
       result = await User.findOne({email:email});
    if (!result || result.length == 0) {
      return false;
    }}catch(ex){console.log(ex);}
    return result;
  } //getuserbyemail-method

  addUser = async (body) => {
    const searchforemail = await User.find({email:body.email});
    if(searchforemail.length==0 || !searchforemail){
    const result = await User.create(body);
    return result
  }else{
    return false;
  }
  } //add User-method

  updateUser = async (id, body) => {
    const searchforemail = await User.find({email:body.email});
    if(searchforemail.length==0 || !searchforemail){
      const result = await User.updateOne({
      _id: id
    }, {
      $set: body
    });
    return result;
    }else{
      return 'this email is already exists';
    } 
  } //update user-method

}

module.exports = new Usermodule();