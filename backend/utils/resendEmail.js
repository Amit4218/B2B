// import { Resend } from "resend";
import { config } from "dotenv";
import nodemailer from "nodemailer"; // can remove after setting up the domain for resend
config();

export const sendEmail = async (userEmail, otp) => {
  const resend = new Resend(`${process.env.RESEND_API_KEY}`);

  const { error } = await resend.emails.send({
    from: "B2B <noreply@resend.dev>",
    to: userEmail,
    subject: "One Time Password",
    html: `This is your one-time-password : ${otp} , Do not share it with anyone.`,
  });

  console.log(error);
};

export const sendEmailNodeMailer = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // use TLS, but not on connect (STARTTLS)
      auth: {
        user: process.env.NODE_MAILER_SENDER_EMAIL,
        pass: process.env.NODE_MAILER_SENDER_PASSWORD, // your app password
      },
    });

    const info = await transporter.sendMail({
      from: `"B2B" <${process.env.NODE_MAILER_SENDER_EMAIL}>`,
      to: email,
      subject: "One Time Password",
      text: `This is your one-time-password : ${otp} , Do not share it with anyone.`,
    });

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
