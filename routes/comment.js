
const router = require("express").Router();
const Auth = require("../middleware/auth");

const {
    postComment,
    deleteComment
} = require("../controllers/comment.controller");
const {
    POSTCOMMENT,
    DELETECOMMENT
} = require("../constant/validator/comment");
const validate = require("../validator/comment");

const PATH = {
    POSTCOMMENT: "/post_comment",
    DELETECOMMENT:"/delete_comment/:comment_id"

};

/**
 * @api {POST} /post_comment
 * @desc POSTCOMMENT API
 * @access public
 * **/
router.post(
    PATH.POSTCOMMENT,
    Auth.VerifyToken,
    validate(POSTCOMMENT),
    postComment
);
/**
 * @api {DELETE} /delete_comment/:comment_id
 * @desc DELETECOMMENT API
 * @access private
 * **/
 router.delete(
    PATH.DELETECOMMENT,
    Auth.VerifyToken,
    deleteComment
);



module.exports = router;