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
        default:0,
    },
    disLike:{
        type:Number,
        default:0,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    channelId:{
        type:Schema.Types.ObjectId,
        ref:"Channel"
    }
},{timestamps:true})

export const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);