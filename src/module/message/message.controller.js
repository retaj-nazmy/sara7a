import {Router} from "express"
import { successResponse } from "../../common/exceptions/success.response.js"
import { auth } from "../../common/middleware/auth.middleware.js"
import { checkRole } from "../../common/middleware/checkRole.js"
import { getAllMessages, getUserData, getUserMessages, getUserURL, sendMessage } from "./message.service.js"
import { upload } from "../../common/middleware/multer.js"

const router = Router()

router.get('/get-all-messages', auth,checkRole(['1']),async(req,res)=>{
    let data = await getAllMessages()
    successResponse({res, data})
})

router.post('/send-message', upload().single('image'),async(req,res)=>{
    let data = await sendMessage(req.body,req.file)
    successResponse({res,data})
})

router.get('/user-url',auth,async(req,res)=>{
      let data = await getUserURL(req.user)
    successResponse({res,data})  
})

router.get('/user',async(req,res)=>{
      let data = await getUserData(req.body)
    successResponse({res,data})  
})

router.get('/get-user-messages',auth,async(req,res)=>{
      let data = await getUserMessages(req.user)
    successResponse({res,message: "messages found",data})  
})



export default router