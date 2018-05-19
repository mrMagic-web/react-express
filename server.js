const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const port = proscess.env.PORT || 5000;

const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use(express.static(path.join(__dirname, '/public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});


app.post('/api/form', (req, res) => {
  const prods = Object.keys(JSON.parse(req.body.products));
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    <hr/>
    <h4>Products</h4>
    ${prods.map( p => `${p} <br/>`)}
  `;
	 // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'mail.rometarkus.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'test@rometarkus.com', // generated ethereal user
        pass: 'Hynka719'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Fastpack products" <test@rometarkus.com>', // sender address
      to: 'maciejdrahusz@hotmail.co.uk, maciejdrahusz@googlemail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });

});

app.listen(port, () => `Server running on port ${port}`);