import mongoose, { Schema } from 'mongoose';

const videoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    videoUrl:{
        type:String,
        required:true,
    },
    like:{
        type:Number,
    },
    disLike:{
        type:Number,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    channelId:{
        type:Schema.Types.ObjectId,
        ref:"Channel"
    }
})

export const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);