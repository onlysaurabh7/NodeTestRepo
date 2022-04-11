const { body } = require("express-validator");
const {
    POSTBLOG,
   

} = require("../constant/validator/blog");

const validate = (method) => {
    let error = [];
    switch (method) {
        case POSTBLOG: {
            error = [
                body("title", "Please enter title").not().isEmpty(),
                body("description", "Please enter description").not().isEmpty(),
            ];
            break;
        }
      
    }
    return error;
};

module.exports = validate;