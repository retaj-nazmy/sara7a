import jwt from "jsonwebtoken";
import { BadRequestException, ConflictException, NotFoundException } from "../../common/exceptions/error.exception.js";
import { compareHash, generateHash } from "../../common/index.js";
import { userModel } from "../../database/model/user.model.js";
import { generateNewAccessToken, generateToken } from "../../common/services/token.service.js";


export const signup = async (data)=>{
    let {userName , email , password , confirmPassword ,age, gender} = data;
    if(confirmPassword !== password){
        return BadRequestException({message : "password and confirm password are not matched"})
    }
     let existedEmail = await userModel.findOne({email})
     if(existedEmail){
        return ConflictException({message : "Email already exist"})
     }else{
        let hashedPassword =await generateHash({plainText : password})
        if(!hashedPassword){
            return BadRequestException({message : "password is not hashed"})
        }else{
            let user = await userModel.create({userName , email , password: hashedPassword,age, gender})
            return user
        }
     }
}


export const signin = async(data)=>{
    let {email , password} = data;
    let userData = await userModel.findOne({email})
    if(!userData){
        return NotFoundException({message : "user not found"})
    }

    let isMatched = await compareHash({plainText : password , hashedData : userData.password})
    if(isMatched){
       const {accessToken, refreshToken} = await generateToken(userData)
       return {message : "login successfully" , accessToken, refreshToken}

    }else{
         return BadRequestException({message : "password is not matched"})
    }
}

export const getUserById = async(id)=>{
    let user = await userModel.findById(id)
    if(!user){
        return NotFoundException({message : "user not found"})
    }
    return user
}

export const generateAccessToken = async(data)=>{
    let {refreshToken} = data;
    let {accessToken} = await generateNewAccessToken(refreshToken)
    if(accessToken){
        return accessToken
    }else{
        return BadRequestException({message : "invalid refresh token"})
    }
}

