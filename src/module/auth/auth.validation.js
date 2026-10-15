import z from "zod"

export  const userLoginSchema = z.strictObject({
        email : z.string().email(),
        password : z.string()
    })
