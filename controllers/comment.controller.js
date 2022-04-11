
const blogModel = require("../models/blog.model")
const commentModel = require("../models/comment.model")
const { validationResult } = require("express-validator");
const mongoose = require('mongoose');
const postComment = async (req, res) => {
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
            name,
            email,
            comment,
            blog_id
        } = req.body;

        let newComment = new commentModel({
            name,
            email,
            comment,
            blog_id,
            user_id: _id
        });

        let addedComment = await newComment.save();
        return res.status(200).send({
            message: "Comment was posted successfully",
            status: true,
            data: addedComment,

        });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Something went wrong", status: false, error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {

        const { comment_id } = req.params;
        const { _id } = req.user;

        const commentData = await commentModel.find({
            _id: comment_id,
            user_id: _id,
            is_deleted: false,
        });

        if (commentData && commentData.length > 0) {
            await commentModel.findOneAndUpdate(
                { _id: comment_id, user_id: _id },
                { $set: { is_deleted: true } }
            );
            return res.status(200).send({
                message: "Comment deleted successfully",
                status: true,
            });
        } else {
            return res.status(200).send({
                message: "Comment data not found",
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
    postComment,
    deleteComment
};