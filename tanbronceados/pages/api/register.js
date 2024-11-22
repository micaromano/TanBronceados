const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
    return res.status(404).json({ error: 'El teléfono es obligatorio.' });
  } else if (!/^\d+$/.test(phone)) {
    return res.status(404).json({ error: 'El teléfono solo debe contener valores numéricos.' });
  } else if (!/^\d{9}$/.test(phone)) {
    return res.status(404).json({ error: 'El teléfono debe contener 9 dígitos.' });
  } else if (!/^09/.test(phone)) {
    return res.status(404).json({ error: 'El teléfono debe comenzar con "09".' });
  }

  // instagram
  if (!instagram.startsWith('@')) {
    return res.status(404).json({ error: 'El usuario de Instagram debe empezar con @.' });
  } else if (!/^@[a-zA-Z0-9_.]+$/.test(instagram)) {
    return res.status(404).json({ error: 'El usuario de Instagram solo puede contener letras, números, puntos y guiones bajos.' });
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
  const [results, metadata] = await db.query(
    'SELECT * FROM Clients WHERE Email = :email',
    {
      replacements: { email: email },
      type: db.QueryTypes.SELECT,
    }
  );

  const cliente = results;

  if (cliente) {
    return res.status(404).json({ error: 'Este email ya se encuentra registrado.' });
  }

  // Se verifica que el token existe
  if (!captchaToken) {
    return res.status(400).json({ error: 'Falta el token de reCAPTCHA.' });
  }

  // Procesa la solicitud si el captcha es válido
  try {
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: secretKey, response: captchaToken }),
      });

    if (!response.ok) {
      return res.status(400).json({ error: 'Captcha inválido.' });
    }

    // Encripta la contraseña antes de guardarla
    const PasswordHash = await bcrypt.hash(password, 10);

    // Genera y almacena el token
    const token = jwt.sign({ email: email }, jwtSecret, { expiresIn: '1h' });

    enviarCorreoConfirmacion(email, token);

    // Indica que el cliente se encuentra inactivo por defecto
    const isActive = false;

    // Crea el cliente en la base de datos
    const [results, metadata] = await db.query(`
      INSERT INTO Clients (FullName, Email, PasswordHash, Phone, Instagram, Birthdate, Gender, isActive, createdAt, updatedAt) 
      VALUES ('${fullName}', '${email}', '${PasswordHash}', '${phone}', '${instagram}', '${new Date(birthdate).toISOString().split('T')[0]}', '${gender}', '${isActive}', '${new Date().toISOString()}', '${new Date().toISOString()}');
      `);

    return res.status(201).json({ message: 'Registro enviado correctamente.' });

  } catch (error) {
    console.error('Error during client register:', error);
    return res.status(500).json({ error: 'Error del servidor al registrar usuario.' });
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