
const blogModel = require("../models/blog.model")
const commentModel = require("../models/comment.model")
const { validationResult } = require("express-validator");

const postBlog = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            const errors = error.array()[0].msg;
            return res.status(400).send({
                message: errors,
                status: false,
            });
        }
        const { _id } = req.user;
        const {
            title,
            description
        } = req.body;


        let newBlog = new blogModel({
            title,
            description,
            user_id: _id
        });

        let addedBlog = await newBlog.save();
        return res.status(200).send({
            message: "Blog posted successfully",
            status: true,
            data: addedBlog,

        });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Something went wrong", status: false, error: error.message });
    }
};



const getBlog = async (req, res) => {
    try {

        const { _id } = req.user;
        let userBlog = await blogModel.find({ user_id: _id })
        if (!userBlog) {
            return res.status(400).send({
                message: "Failed",
                status: false
            })
        }
        else {
            return res.status(200).send({
                message: "Sucess",
                status: true,
                data: userBlog
            })
        }
    } catch (error) {
        return res.status(400).send({
            message: "Failed",
            error: error.message

        })
    }
}
const getAllCommentByBlogId = async (req, res) => {
    try {

        const { blog_id } = req.params;
        let userComment = await commentModel.find({ blog_id: blog_id })
        if (!userComment) {
            return res.status(400).send({
                message: "Failed",
                status: false
            })
        }
        else {
            return res.status(200).send({
                message: "Sucess",
                status: true,
                data: userComment
            })
        }
    } catch (error) {
        return res.status(400).send({
            message: "Failed",
            error: error.message

        })
    }
}
const deleteBlog = async (req, res) => {
    try {

        const { blog_id } = req.params;
        const { _id } = req.user;

        const blogData = await blogModel.find({
            _id: blog_id,
            user_id: _id,
            is_deleted: false,
        });

        if (blogData && blogData.length > 0) {
            await blogModel.findOneAndUpdate(
                { _id: blog_id, user_id: _id },
                { $set: { is_deleted: true } }
            );
            return res.status(200).send({
                message: "Blog deleted successfully",
                status: true,
            });
        } else {
            return res.status(200).send({
                message: "Blog data not found",
                status: false,
            });
        }



    } catch (error) {
        return res
            .status(500)
            .send({ message: "Something went wrong", status: false, error: error.message });
    }
};
module.exports = {
    postBlog,
    getBlog,
    getAllCommentByBlogId,
    deleteBlog

};