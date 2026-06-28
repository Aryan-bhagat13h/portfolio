import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import"dotenv/config";
 
const app = express();
app.use(cors());
app.use(express.json());



// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
 
app.post("/submit", (req, res) => {
  const { name, email, message, topic } = req.body;
  console.log("Received form data:", { name, email, message, topic });
const adminHtml =`<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
<h2>New Contact Form Submission</h2>
<p><strong>name :</strong> ${name}</p>
<p><strong>email :</strong> ${email}</p>
<p><strong>message :</strong></p>
<p>${message}</p>
</div>`;


const adminMailOptions = {
  from: `"${name}" <${process.env.SMTP_USER}>`,  // ✅ must be YOUR Gmail
  replyTo: email,                                  // visitor's email goes here
  to: process.env.EMAIL_USER,
  subject: `New message from ${name}: ${topic}`,
  html: adminHtml,
};



transporter.sendMail(adminMailOptions, (error, info) => {
if (error) {
console.error("Error sending email to admin:", error);
res.status(500).json({ success: false, message: "Failed to send email" });
} else {
console.log("Email sent to admin:", info.response);
res.json({ success: true, message: "Email sent successfully" });}});




});




const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on http://localhost:" + port));
 