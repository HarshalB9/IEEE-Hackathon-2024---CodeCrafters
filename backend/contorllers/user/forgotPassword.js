import nodemailer from'nodemailer';
import env from "dotenv";
import z from "zod";
import bcrypt from "bcrypt";
import prisma from '../../db/prismaExport.js';
let saltRounds = 10;
env.config();
const schema = z.object({
    email: z.string().email(),
    otp: z.string().min(6)
});
async function emailandOTPVerify(email,otp){
    const user_details = {email , otp };
    try {
        const result = await schema.parse(user_details);
        console.log("zod verified");
        // return res.json({message : "zod verified"})
        return true;
    } catch (error) {
        console.log("zod error");
        return false;
    }
}
async function updateOTP(email){
    return new Promise(async (resolve ,reject)=>{
        try {
            await prisma.user.update({
                data:{
                    otp:"-1",
                },
                where:{
                    email:email
                }
            })
            resolve("done");
        } catch (error) {
            reject(error);
        }

    })
}
const emailSchema = z.object({
    email: z.string().email(),
  });
const emailAndPassword = z.object({
    email : z.string().email(),
    password : z.string().min(8)
})
async function emailVerify(email){
    const user_details = {email };
    try {
        const result = await emailSchema.parse(user_details);
        console.log("zod verified");
        return true;
    } catch (error) {
        console.log("zod error");
        return false;
    }
}
function generateOTP() {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
const sendMail = async ( to , otp) => {
    const transporter = nodemailer.createTransport({
        service: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: "avkrgawande@gmail.com", // Replace with your email address
        to:to,
        subject: 'Your Password Reset OTP',
        text: `Your one-time password (OTP) to reset your password is: ${otp}`
      };

    console.log(`Sending mail to - ${to}`);
    transporter.sendMail(mailOptions, (error, info)=> {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export  async function forgotPassword(req ,res){
    const { email } = req.body;
    if(!email)
    {
        res.json({Api_Response : 306 , message : "Email not provided"})
    }
    const result = await emailVerify(email);
    if(!result)
    {
        return res.json({Api_Response : 300,message : "Improper Email"})
    }
    const user = await prisma.user.findUnique({where:{email:email}})
    if (!user) {
        return res.status(404).json({Api_Response : 302, message: 'User not found' });
    }
    try {
        const otp = generateOTP();
        const expiry = Date.now() + 120000; // wait till two minutes
        await sendMail(email , otp);
        await prisma.user.update({
            data:{
                otp:otp,
                otpExpiry:new Date(expiry)
            },
            where:{
                email:email
            }
        });

        res.json({ message: 'OTP sent to your email!' });
    } catch (error) {
        console.log(error);
        return res.json({message : "There was an error : " , error})
    } 
}
export async function verifyOtp(req ,res){
    const { email , otp } = req.body;
    if(!email)
    {
        return res.json({Api_Response : 306 , message : "Email not provided"})
    }
    
    if(!otp)
    {
        return res.json({Api_Response : 310 , message : "OTP not provided"})
    }
    const result = await emailandOTPVerify(email , otp);
    
    if(!result)
    {
        return res.json({Api_Response : 311 , message : "wrong structure of email"})
    }

    const user = await prisma.user.findUnique({where:{email}});
    if (!user) {
        return res.json({Api_Response : 312 , message : "no such user"});
    }

    if(user.email == email && user.otp == otp )
    {
        if(user.otpExpiry > Date.now())
        {
            // user.otp = null;
            // user.otpExpiry = null;
            // await user.save();
            try {
                await updateOTP(email);
            } catch (error) {
                console.log("Error in setting otp to -1");
                console.log(error);
                return res.json({message : "Error in setting otp to -1"})
            }
            
            return res.json({verified : true});
        }
        else{
            try {
                await updateOTP(email);
            } catch (error) {
                console.log("Error in setting otp to -1");
                console.log(error);
                return res.json({message : "Error in setting otp to -1"})
            }
            // await user.save();
            return res.json({Api_Response : 313 , message : "time expiered"})
        }

    }
    try {
        await updateOTP(email);
    } catch (error) {
        console.log("Error in setting otp to -1");
        console.log(error);
        return res.json({message : "Error in setting otp to -1"})
    }
    return res.json({Api_Response : 314 , message : "otp is not valid"});
    
}

export async function changePassword(req ,res){
    const {email , password} = req.body;
    if(!email || !password)
    {
        res.json({message : "please provide the email and password"});

    }
    try {
        const result = emailAndPassword.parse({email , password});
    } catch (error) {
        return res.json({message : "Email or password improper"})
    }
    const userObject = await prisma.user.findUnique({where:{email}})
    if(!userObject)
    {
        return res.json({message : "no such user"});
    }
    bcrypt.hash(password , saltRounds ,async(err,hash)=>{
        if(err){
            return res.json({message :"errror generating the hashed password" , error : err});
        }
        else if(!err){
            const hashedPassword = hash;
            if(hashedPassword)
                {
                    // user.email = email;
                    // user.password = hashedPassword;
                    // await user.save();
                    await prisma.user.update({
                        data:{
                            password : hashedPassword,
                            email:userObject.email,
                            name :userObject.name
                        },
                        where:{
                            user_id : userObject.user_id
                        }
                    })
                    return res.json({message : "the user password is updated"})
                }
            else{
                return res.json({message  : "no hashed password"})
            }
        }
    })
}