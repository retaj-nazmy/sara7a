import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";
import { statusEnum } from "../../common/index.js";


const RequestSchema = new Schema({
    messageId: {
        type : Types.ObjectId,
        ref : "message",
        required : true
    },
    requesterId: {
        type : Types.ObjectId,
        ref : "user",
        required : true
    },
    ownerId: {
        type : Types.ObjectId,
        ref : "user",
        required : true
    },
    status: {
        type : Number,
        enum : statusEnum,
        default : statusEnum.pending
    }

},
{
    timestamps : true
})
  

RequestSchema.index(
  { messageId: 1, requesterId: 1 },
  {unique: true}
)
export const requestModel = mongoose.model("request", RequestSchema);