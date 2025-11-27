import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host
})
