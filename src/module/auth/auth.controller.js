import {Router} from "express"
import { generateAccessToken, getUserById, signin, signup } from "./auth.service.js";
import { auth } from "../../common/middleware/auth.middleware.js";

const router = Router()

router.post('/signup' ,async (req,res)=>{
    let data = await signup(req.body);
    res.json(data)
})

router.post('/signin' ,async (req,res)=>{
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

export default router