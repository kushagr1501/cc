import mongoose, { Types } from 'mongoose';

const MessageSchema = new mongoose.Schema({
    senderId:{
       type: mongoose.Schema.Types.ObjectId,
       ref:"User" 
    },
    receiverId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
 
    },
    
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
 
    }
    ,
    message: String,
    mediaUrl: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
