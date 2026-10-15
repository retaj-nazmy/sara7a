import nodemailer from "nodemailer";
import { env } from "../../config/env.service.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user : env.emailUser,
        pass: env.appPassword
    }
});



export const sendEmail = ({to, subject, html})=>{
    transporter.sendMail({
    from: "sara7a@gmail.com",
    to: to,
    subject: subject,
    html: html
})
console.log('email send');
}