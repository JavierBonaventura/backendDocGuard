// app.js

const nodemailer = require('nodemailer');

// Configuración del transporte
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'riberacuarzo@gmail.com', // Reemplaza con tu dirección de correo electrónico
    pass: 'akcr qljs njfw txkk' // Reemplaza con tu contraseña
  }
});

// Detalles del correo electrónico
let mailOptions = {
  from: 'riberacuarzo@gmail.com',
  to: 'riberacuarzo@gmail.com', // Reemplaza con la dirección del destinatario
  subject: 'Asunto del correo',
  text: 'Cuerpo del correo electrónico.'
};

// Enviar el correo electrónico
transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Correo electrónico enviado: ' + info.response);
  }
});
