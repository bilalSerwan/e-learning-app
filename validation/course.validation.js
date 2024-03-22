const Joi =  require('joi'); 

class CourseValidation{
   async validateCourse(data){
        const coursevalid = Joi.object({
            name: Joi.string().min(5).max(100).required().trim(),
         backgroundImage: Joi.string(),
         author : Joi.string().required(),
         description: Joi.string().min(5).required(),
         price : Joi.number(),
         numberOfStudents:Joi.number(),
         videos : Joi.array().items(),
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
        async validateCourseForUpdateCourse(data){
            const coursevalid = Joi.object({
                name: Joi.string().min(5).max(100).trim(),
             backgroundImage: Joi.string(),
             author : Joi.string(),
             description: Joi.string().min(5),
             price : Joi.number(),
             numberOfStudents:Joi.number(),
             videos : Joi.array().items(),
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