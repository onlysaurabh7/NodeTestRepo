const { body } = require("express-validator");
const {
    POSTCOMMENT,    
} = require("../constant/validator/comment");

const validate = (method) => {
    let error = [];
    switch (method) {
        case POSTCOMMENT: {
            error = [
                body("name", "Please enter name").not().isEmpty(),
                body("email", "Please enter email").not().isEmpty(),
                body("comment", "Please provide comment")
                    .not()
                    .isEmpty(),
                body("blog_id", "Please provide blog_id")
                    .not()
                    .isEmpty(),
            ];
            break;
        }
       
    }
    return error;
};

module.exports = validate;