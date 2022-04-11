const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,

    },
    description: {
        type: String,

    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    is_deleted: { type: Boolean, default: false },

},
    {
        timestamps: true

    })


module.exports = mongoose.model("Blog", BlogSchema);