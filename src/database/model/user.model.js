import { model, Schema } from "mongoose";
import { GenderEnum, providerEnum, RoleEnum } from "../../common/index.js";
import { required } from "zod/mini";

const userSchema = new Schema({
    userName : {
        type : String,
        required : true,
        min :3, 
        max:30
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    age : {
        type : Number
    },
    gender : {
        type : String,
        enum : GenderEnum,
        default : GenderEnum.Female
    },
    role : {
        type : String,
        enum : RoleEnum,
        default : RoleEnum.User
    },
    provider : {
        type : String,
        enum : providerEnum,
        default : providerEnum.System
    },
    profileImage : {
        type : String,
    },
    coverImage : {
        type : [String],
    },
    isverified : {
        type : Boolean,
        default : false
    },
    uniqueName:{
        type:String,
        required : true,
        unique: true
    }
},{
    timestamps : true
})

export const userModel = model("user" , userSchema)