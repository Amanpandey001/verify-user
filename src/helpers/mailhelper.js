import Input from "@/models/inputModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    //TODO: configure mail for usage
    const hasedverToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "verification") {
      await Input.findByIdAndUpdate(userId,{
        $set:{
        isVerified: false,
        verifyToken: hasedverToken,
        verifyTokenExpiry: Date.now() + 3600000
    }});
    }
    else if (emailType === "forgotPassword") {
      await Input.findByIdAndUpdate(userId, {
        $set: {
        isVerified: false,
        forgotPasswordToken: hasedverToken,
        forgotPasswordExpiry: Date.now() + 3600000
    }});
      console.log("forgotPassword mail")
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "83abb4ecd91ea9",
        pass: "e9cb90fafd6701"
      }
    });
    const mailOptions = {
      from: 'aman@aman.com', // sender address
      to: email,
      subject: emailType === "verification" ? "Verify Your Email" : "Reset Password", // Subject line
      html: `<div>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hasedverToken}">here</a> to ${emailType === "verification" ? "verify your email" : "reset your password"} or copy the link ${process.env.DOMAIN}/verifyEmail?token=${hasedverToken}</div>`, // html body
    };
    const mailRes = await transport.sendMail(mailOptions);
    return mailRes;
  } catch (error) {
    throw new Error(error)
  }
}