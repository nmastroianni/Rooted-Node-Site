var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

module.exports = function() {
    /* GET Contact Form page. */
    router.get('/', function(req, res, next) {
        res.render('contact', {
            page: "Contact Us",
            sitekey: process.env.RECAPTCHA_SITEKEY
        });
    });
    router.post('/send', function(req,res,next){
        const output = `
            <p>You have a new support request</p>
            <h3>Contact Details</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Best Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${req.body.name}</td>
                        <td>${req.body.email}</td>
                        <td>${req.body.phone}</td>
                        <td>${req.body.time}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Message</h3>
            <p>${req.body.message}</p>
        `
        // async..await is not allowed in global scope, must use a wrapper
        async function main(){
        
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
            host: "mail.mrmastroianni.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PW 
            }
            });
        
            // send mail with defined transport object
            let info = await transporter.sendMail({
            from: `"Rooted Support" <${process.env.EMAIL_FROM}>`, // sender address
            to: process.env.EMAIL_RECIPIENT, // list of receivers
            subject: "New Support Request", // Subject line
            text: "Hello world?", // plain text body
            html: output // html body
            });
        
            console.log("Message sent: %s", info.messageId);
            
            res.render('contact', {
                page: "Message Sent",
                success: "true"
            })
        }
        
        main().catch(console.error);
    });
    return router;
  } 
  