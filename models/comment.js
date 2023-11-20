import mongoose, { Schema } from 'mongoose';

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    videoId:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

})

export const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);