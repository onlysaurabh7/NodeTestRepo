
const router = require("express").Router();
const Auth = require("../middleware/auth");

const {
    postBlog,
    getBlog,
    getAllCommentByBlogId,
    deleteBlog
} = require("../controllers/blog.controller");
const {
    POSTBLOG,
    GET_BLOG,
    GET_ALLCOMMENTBY_BLOGID,
    
} = require("../constant/validator/blog");
const validate = require("../validator/blog");

const PATH = {
    POSTBLOG: "/post_blog",
    GET_BLOG: "/get_blog",
    GET_ALLCOMMENTBY_BLOGID:"/get_comment/:blog_id",
    DELETEBLOG:"/delete_blog/:blog_id"

};

/**
 * @api {POST} /post_blog
 * @desc POSTBLOG API
 * @access private
 * **/
router.post(
    PATH.POSTBLOG,
    Auth.VerifyToken,
    validate(POSTBLOG),
    postBlog
);


/**
 * @api {GET} /get_blog
 * @desc Get Blog API
 * @access private
 * **/
router.get(PATH.GET_BLOG, Auth.VerifyToken, validate(GET_BLOG), getBlog);
/**
 * @api {GET} /get_comment/:blog_id
 * @desc Get Comment API
 * @access public
 * **/
 router.get(PATH.GET_ALLCOMMENTBY_BLOGID,  validate(GET_ALLCOMMENTBY_BLOGID), getAllCommentByBlogId);

/**
 * @api {DELETE} /delete_blog/:blog_id
 * @desc DELETEBLOG API
 * @access private
 * **/
 router.delete(
    PATH.DELETEBLOG,
    Auth.VerifyToken,
    deleteBlog
);


module.exports = router;