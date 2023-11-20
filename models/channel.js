import mongoose, { Schema } from 'mongoose';

const channelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    subscriber:{
        type:Number,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    videoId:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    img:{
        type:String,
        required:true,
    }

})

export const Channel = mongoose.models.Channel || mongoose.model('Channel', channelSchema);