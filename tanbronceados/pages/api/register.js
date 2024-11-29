const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ClientModel = require('../../models/ClientModel');
const db = require('../../config/db');
const globals = require('../../config/globals');
const nodemailer = require('nodemailer');

const jwtSecret = globals.jwt_secret;
const secretKey = globals.secret_key;
const emailUser = globals.email_user;
const passUser = globals.pass_user;

async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { fullName, password, email, phone, instagram, birthdate, gender, captchaToken } = req.body;

  // Se validan campos antes de procesarlos
  // fullName
  if (!fullName.trim()) {
    return res.status(404).json({ error: 'El nombre completo es obligatorio.' });
  }
  else if (fullName.length < 3) {
    return res.status(404).json({ error: 'El nombre completo debe tener al menos 3 caracteres.' });
  }

  // password
  if (!password.trim()) {
    return res.status(404).json({ error: 'La contraseña es obligatoria.' });
  } else if (password.length < 8) {
    return res.status(404).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
  } else if (!/[A-Z]/.test(password)) {
    return res.status(404).json({ error: 'La contraseña debe tener al menos una letra mayúscula.' });
  } else if (!/[0-9]/.test(password)) {
    return res.status(404).json({ error: 'La contraseña debe tener al menos un número.' });
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return res.status(404).json({ error: 'La contraseña debe tener al menos un carácter especial.' });
  }

  // email
  if (!email.trim()) {
    return res.status(404).json({ error: 'El email es obligatorio.' });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.status(404).json({ error: 'El formato del email es inválido.' });
  }

  // phone
  if (!phone.trim()) {
    return res.status(404).json({ error: 'El celular es obligatorio.' });
  } else if (!/^\d+$/.test(phone)) {
    return res.status(404).json({ error: 'El celular solo debe contener valores numéricos.' });
  } else if (!/^\d{9}$/.test(phone)) {
    return res.status(404).json({ error: 'El celular debe contener 9 dígitos.' });
  } else if (!/^09/.test(phone)) {
    return res.status(404).json({ error: 'El celular debe comenzar con "09".' });
  }

  // instagram
  if (instagram) {
    if (!instagram.startsWith('@')) {
      return res.status(404).json({ error: 'El usuario de Instagram debe empezar con @.' });
    } else if (!/^@[a-zA-Z0-9_.]+$/.test(instagram)) {
      return res.status(404).json({ error: 'El usuario de Instagram solo puede contener letras, números, puntos y guiones bajos.' });
    }
  }

  // birthdate
  if (!birthdate) {
    return res.status(404).json({ error: 'La fecha de nacimiento es obligatoria.' });
  } else {
    const age = new Date().getFullYear() - new Date(birthdate).getFullYear();
    if (age < 18) {
      return res.status(404).json({ error: 'Debes ser mayor de 18 años.' });
    }
  }

  // gender
  if (!gender) {
    return res.status(404).json({ error: 'El género es obligatorio.' });
  }

  // Se verifica que el usuario no exista
  const client = await ClientModel.raw.findOne({ where: { Email: email } });

  if (client) {
    return res.status(404).json({ error: 'Este email ya se encuentra registrado.' });
  }

  // Se verifica que el token existe
  if (!captchaToken) {
    return res.status(400).json({ error: 'Falta el token de reCAPTCHA.' });
  }

  // Procesa la solicitud si el captcha es válido
  try {
    const captchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: secretKey,
          response: captchaToken,
        }),
      });

    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      return res.status(400).json({ error: 'Captcha inválido o no verificado.' });
    }

    // Encripta la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Genera y almacena el token
    const token = jwt.sign({ email: email }, jwtSecret, { expiresIn: '1h' });

    //Crea el servicio en la base de datos
    const newClient = await ClientModel.raw.create({
      FullName: fullName,
      Email: email,
      PasswordHash: hashedPassword,
      Phone: phone,
      Instagram: instagram,
      Birthdate: new Date(birthdate).toISOString().split('T')[0],
      Gender: gender,
      isActive: false, // cliente inactivo
    });

    // Notificar éxito del registro al cliente
    res.status(201).json({ message: 'Registro enviado correctamente.' });

    // Enviar el correo después de completar el registro
    try {
      await enviarCorreoConfirmacion(email, token);
    } catch (correoError) {
      console.error('Error al enviar el correo de confirmación:', correoError);
      // No se interrumpe el proceso ni se envía error al cliente
    }

  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    return res.status(500).json({ error: 'Ocurrió un error interno en el servidor.' });
  }
}

// Configura el transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail', // o el servicio SMTP que quieramos
  auth: {
    user: emailUser, // correo de la empresa
    pass: passUser   // contraseña de la empresa
  }
});

// Función para enviar el correo
const enviarCorreoConfirmacion = async (emailCliente, token) => {
  const linkConfirmacion = `http://localhost:3000/api/confirmAccount/${token}`;

  const opcionesCorreo = {
    from: emailUser,
    to: emailCliente,
    subject: 'Confirmación de cuenta TANBronceados',
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
    console.log('Correo de confirmación enviado.');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

module.exports = handler;