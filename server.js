import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());


app.use(cors({ origin: "http://127.0.0.1:5500", }));

app.get("/ping", (req, res) => {
  res.json({ message: "server alive" });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth:{
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});




app.post("/send-email", async(req, res) =>{
  try{
    const{name, email, message} = req.body;
    const mailOptions = {
      from:`"${name}" <${email}>`,
      to: process.env.MAIL_TO || process.env.MAIL_USER,

      subject: "new contact form message",
      text:`
      Name: ${name}
      Email: ${email}
      Message: ${message}`,
    };
   await transporter.sendMail(mailOptions);
   return res.json({success:true});
  } catch (err){
    console.error("error sending email:", err);
    return res.status(500).json({success: false, error: "email failed"});
  }
});

app.listen(PORT, ()=>{
  console.log(`server running on http://localhost:${PORT}`);
});
