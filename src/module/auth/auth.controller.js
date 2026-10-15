import {Router} from "express"
import { generateAccessToken, getAllUsers, getUserById, signin, signup, verifyAccount } from "./auth.service.js";
import { auth } from "../../common/middleware/auth.middleware.js";
import { validation } from "../../common/services/validation.service.js";
import { userLoginSchema } from "./auth.validation.js";
import { checkRole } from "../../common/middleware/checkRole.js";
const router = Router()

router.post('/signup' ,async (req,res)=>{
    let data = await signup(req.body);
    res.json(data)
})

router.post('/signin' ,validation(userLoginSchema),async (req,res)=>{

    let data = await signin(req.body);
    res.json(data)
})

router.get('/get-by-id' ,auth,async (req,res)=>{
    let data = await getUserById(req.user.id);
    res.json(data)
})

router.post('/generate-access-token', async(req,res)=>{
    let accessToken = await generateAccessToken(req.body)
    res.json({ accessToken })
})

router.put('/verify-account',async(req,res)=>{
    let data = await verifyAccount(req.body)
    res.json(data)
})

router.get('/get-all-users',auth,checkRole(['1']) ,async(req,res)=>{
     let data = await getAllUsers()
    res.json(data)   
})

export default router