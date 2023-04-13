import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_URL } = process.env;

const mailService = async (to, link) => {
  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: SMTP_USER,
    to,
    subject: `Account activation ${API_URL}`,
    text: "",
    html: `<div><h1>Follow the link to activate your account</h1><a href="${link}">${link}</a></div>`,
  });

  console.log("send email");
};

export default mailService;
