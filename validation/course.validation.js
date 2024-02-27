const Joi =  require('joi'); 

class CourseValidation{
   async validateCourse(data){
        const coursevalid = Joi.object({
            name: Joi.string().min(5).max(100).required().trim(),
         background: Joi.string(),
         author : Joi.string().required(),
         description: Joi.string().min(5).required(),
         price : Joi.number(),
         numberOfStudents:Joi.number(),
         videos : Joi.array().items(Joi.string()),
        });
        const result = await coursevalid.validate(data);
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

    
}
module.exports = new CourseValidation();