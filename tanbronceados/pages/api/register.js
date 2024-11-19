const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ClientModel = require('../../models/ClientModel'); // Asegúrate de que la ruta es correcta
const db = require('../../config/db');
const globals = require('../../config/globals');
const nodemailer = require('nodemailer');

const jwtSecret = globals.jwt_secret;
const secretKey = globals.secret_key;
const emailUser = globals.email_user;
const passUser = globals.pass_user;

console.log('Email:', emailUser);
console.log('Pass:', passUser);

//Configura el transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail', // o el servicio SMTP que elijas
  auth: {
    user: emailUser, // tu correo
    pass: passUser         // tu contraseña
  }
});

//Función para enviar el correo
const enviarCorreoConfirmacion = async (emailCliente, token) => {
  const linkConfirmacion = `http://localhost:3000/api/confirmAccount/${token}`;

  const opcionesCorreo = {
    from: emailUser,
    to: emailCliente,
    subject: 'Confirmación de cuenta TANBronceados',
    // html: `<p>Gracias por registrarte. Haz clic en el siguiente enlace para confirmar tu cuenta:</p>
    //        <a href="${linkConfirmacion}">Confirmar Cuenta</a>`
    html: `<div align="center">
              <img src="cid:imagenUnica"/>
              <h1>¡Bienvenido a Tan. Bronceado orgánico!</h1></br>
              <p>Gracias por registrarte. Estás a solo un clic de comenzar con Tan bronceado orgánico. Todo lo que necesita hacer es verificar su dirección de correo electrónico para activar su cuenta de Tan.</p>
              <p>Haz clic en este enlace de confirmación: </p><a href="${linkConfirmacion}">Confirmar cuenta</a>.
              <p>Una vez activada su cuenta, puede comenzar a utilizar todas las funciones de Tan para la gestion de agenda del servicio.</p><p>Estás recibiendo este correo electrónico porque recientemente creaste una nueva cuenta de Tan o agregaste una nueva dirección de correo electrónico. Si no eres tú, ignora este correo electrónico.</p>
              </div>`
    ,
    attachments: [
      {
        filename: 'TAN.png', // El nombre de la imagen
        path: 'public/TAN.png', // Ruta local a la imagen
        cid: 'imagenUnica' // Este CID debe coincidir con el de src en la etiqueta img
      }
    ]
  };

  try {
    await transporter.sendMail(opcionesCorreo);
    console.log('Correo de confirmación enviado');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

//************PRUEBAS***************
//Crear cuenta en Ethereal
// async function crearTransporter() {
//     // Crear cuenta en Ethereal (solo para pruebas locales)
//     let cuentaPrueba = await nodemailer.createTestAccount();

//     const transporter = nodemailer.createTransport({
//       host: 'smtp.ethereal.email',
//       port: 587,
//       auth: {
//         user: cuentaPrueba.user, // Usuario generado automáticamente
//         pass: cuentaPrueba.pass  // Contraseña generada automáticamente
//       }
//     });

//     return transporter;
//   }
//************PRUEBAS***************


//************PRUEBAS***************
//Envío de un correo de prueba
// async function enviarCorreoPrueba(emailCliente) {
//   const transporter = await crearTransporter();

//   const opcionesCorreo = {
//     from: 'noreply@miapp.com',
//     to: emailCliente,
//     subject: 'Confirmación de cuenta TANBronceados',
//     text: 'Este es un correo de prueba para la confirmación de cuenta.',
//     html: `<div align="center">
//            <img src="cid:imagenUnica"/>
//            <h1>¡Bienvenido a Tan. Bronceado orgánico!</h1></br>
//            <p>Gracias por registrarte. Estás a solo un clic de comenzar con Tan bronceado orgánico. Todo lo que necesita hacer es verificar su dirección de correo electrónico para activar su cuenta de Tan.</p>
//            <p>Haz clic en este nlace de confirmación: </p><a href="#">Confirmar mi email</a>.
//            <p>Una vez activada su cuenta, puede comenzar a utilizar todas las funciones de Tan para la gestion de agenda del servicio.</p><p>Estás recibiendo este correo electrónico porque recientemente creaste una nueva cuenta de Tan o agregaste una nueva dirección de correo electrónico. Si no eres tú, ignora este correo electrónico.</p>
//            </div>`
//     ,
//   attachments: [
//     {
//       filename: 'TAN.png', // El nombre de la imagen
//       path: 'C:/Users/quartinom/Desktop/Pry/TAN.png', // Ruta local a la imagen
//       cid: 'imagenUnica' // Este CID debe coincidir con el de src en la etiqueta img
//     }
//   ]
//   };

//   const info = await transporter.sendMail(opcionesCorreo);
//   console.log('Correo enviado:', info.messageId);
//   console.log('URL de vista previa:', nodemailer.getTestMessageUrl(info));
// }

// // Llamar a la función
// enviarCorreoPrueba('cliente@ejemplo.com').catch(console.error);

//************PRUEBAS***************

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  console.log('req', req)

  const { fullName, password, email, phone, instagram, birthdate, gender, captchaToken } = req.body;

  console.log('req', fullName, password, email, phone, instagram, birthdate, gender, captchaToken)

  // Asegúrate de que el token existe
  if (!captchaToken) {
    return res.status(400).json({ message: 'Falta el token de reCAPTCHA' });
  }

  try {
    // console.log('Connecting to database...------------------------------------------------------------------------');
    // await db.authenticate();
    // console.log('Database connected.------------------------------------------------------------------------');

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({ fullName: state.fullName, password: state.password, email: state.email, phone: state.phone, instagram: state.instagram, birthdate: state.birthdate, gender: state.gender, captchaToken: state.captchaToken }),
        body: JSON.stringify({ secret: secretKey, response: captchaToken }),
      });
    // {
    //   params: {
    //     secret: 'secretKey,
    //     response: captchaToken
    //   }
    // }


    //const { success } = response.data;

    console.log('response', response);
    if (response.ok) {
      // Procesa la solicitud si el captcha es válido
      res.json({ message: 'Captcha válido' });
      console.log('captcha OK');
    } else {
      res.status(400).json({ message: 'Captcha inválido' });
    }

    // Encripta la contraseña antes de guardarla
    const PasswordHash = await bcrypt.hash(password, 10);
    console.log('PasswordHash', PasswordHash);

    //Generar y almacenar el token
    const token = jwt.sign({ email: email }, jwtSecret, { expiresIn: '1h' });
    console.log('Token created successfully.');

    enviarCorreoConfirmacion(email, token);

    // enviarCorreoPrueba(email);

    // Crea el usuario en la base de datos
    // const newClient = await ClientModel.raw.create({
    //     FullName: fullName,
    //     PasswordHash: PasswordHash,
    //     Email: email,
    //     Phone: phone, 
    //     Instagram: instagram,          
    //     Birthdate: birthdate, 
    //     Gender: gender,
    //   });

    const isActive = false;

    const [results, metadata] = await db.query(`
        INSERT INTO Clients (FullName, Email, PasswordHash, Phone, Instagram, Birthdate, Gender, isActive, createdAt, updatedAt) 
        VALUES ('${fullName}', '${email}', '${PasswordHash}', '${phone}', '${instagram}', '${new Date(birthdate).toISOString().split('T')[0]}', '${gender}', '${isActive}', '${new Date().toISOString()}', '${new Date().toISOString()}');
      `);

    return res.status(201).json({ message: 'Cliente registrado exitosamente' });
    //return res.status(201).json({ message: 'Cliente registrado exitosamente' , client: newClient });

  } catch (error) {
    console.error('Error during client register:', error);
    return res.status(500).json({ error: 'Error del servidor al registrar usuario' });
  }
}

module.exports = handler;