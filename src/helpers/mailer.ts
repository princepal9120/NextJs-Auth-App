import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs';

export const sendEmail =async({email, emailType,userId}:any) =>{
    try {
     
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){cd 
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "7353e4cf24297d",//❌ .env file these things
              pass: "e9ba611b5b3e18"//❌
            }
          });
            const mailOptions ={
                from: '"princepal9120@gmail.com', // sender address
                to: email, // list of receivers
                subject: emailType=="VERIFY"?"Verify our email":"Reset your password", // Subject line
                // text: "Hello world?", // plain text body
                html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>` // html body
              }
              const mailResponse= await  transporter.sendMail(mailOptions)
  return mailResponse;
          
    } catch (error:any) {
        throw new Error(error.message)
    }
}