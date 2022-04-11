const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    name:{
        type:String,
       
    },
    email:{
        type:String,
        
    },
    comment:{
        type:String,
       
    },
    blog_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    is_deleted: { type: Boolean, default: false },

},{
    timestamps: true
    
})

module.exports = mongoose.model("Comment", commentSchema);