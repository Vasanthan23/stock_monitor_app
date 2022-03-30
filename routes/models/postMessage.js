import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    category: String,
    dimensions: String,
    name:String,
    creator: String,
    model:String,
    quantity: String,
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;