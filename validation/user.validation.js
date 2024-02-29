const Joi = require('joi');

class UserValidation {
    
    isuserValidate = async function (data) {
        const uservalidate = new Joi.object({
            firstname: Joi.string().required().min(1).max(25),
            lastname: Joi.string().required().min(1).max(25),
            email: Joi.string().required().min(5).max(100).email(),
            password: Joi.string().required().min(8).max(25),
            image: Joi.string(),
        });
        const result = await uservalidate.validate(data);
        if (result.error) {
            return {
                status: false,
                massage: result.error.details[0].message,
            };
        } else {
            return {
                status: true
            };
        }
    }//method
    async isEmailValid(email){
        const emailValid = await Joi.object({
            email : Joi.string().email().required().min(5),
        });
        const result = await emailValid.validate(email);
        if (result.error) {
            return {
                status: false,
                massage: result.error.details[0].message,
            };
        } else {
            return {
                status: true
            };
        }
    }
}//class



module.exports = new UserValidation();