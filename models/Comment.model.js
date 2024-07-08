const {Schema, model} = require ("mongoose")

const commentSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Content is required.']
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    artwork:{
        type: Schema.Types.ObjectId,
        ref: 'Artwork'
    }},
    {
        timestamps: true
    }
)

const Comment = model("Comment", commentSchema)
module.exports = Comment;