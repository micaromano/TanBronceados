'use client';

// pages/register.js
import RegisterForm from '../../components/RegisterForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// const globals = require('../../config/globals');
// const siteKey = globals.site_key;

function RegisterPage() {
  const [state, setState] = useState({
    fullName: '',
    password: '',
	  email: '',
	  phone: '',
	  instagram: '',	
	  birthdate: null, // Inicializa birthdate como null para DatePicker
    gender: '',
    captchaToken: null, // Inicializa captchaToken como null para el reCaptcha
    //siteKey: siteKey,
	  error: '',
    errors: {}
  });
  const router = useRouter();

  const handleChange = (e, field) => {
    let campo = e;
    if(field != 'birthdate' && field != 'captchaToken'){
        campo = e.target.value;
    }
    setState({ 
        ...state, 
        [field]: campo,
        errors: {
            ...state.errors,
            [field]: '' // Limpiar el error al cambiar el valor
        }
    });
  };

  const handleBlur = (field) => {
    let errorMessage = '';
  
    // Validaciones específicas por campo
    switch (field) {
      case 'fullName':
        if (!state.fullName.trim()) {
          errorMessage = 'El campo de nombre es obligatorio';
        } 
        else if (state.fullName.length < 3) {
          errorMessage = 'El nombre debe tener al menos 3 caracteres';
        }
        break;
  
      case 'password':
        if (!state.password.trim()) {
          errorMessage = 'El campo de contraseña es obligatorio';
        } else if (state.password.length < 8) {
          errorMessage = 'La contraseña debe tener al menos 8 caracteres';
        } else if (!/[A-Z]/.test(state.password)) {
          errorMessage = 'La contraseña debe tener al menos una letra mayúscula';
        } else if (!/[0-9]/.test(state.password)) {
          errorMessage = 'La contraseña debe tener al menos un número';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(state.password)) {
            errorMessage = 'La contraseña debe tener al menos un carácter especial';
        }

        break;
  
      case 'email':
        if (!state.email.trim()) {
          errorMessage = 'El campo de email es obligatorio';
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(state.email)) {
          errorMessage = 'El formato del email es inválido';
        }
        break;
  
      case 'phone':
        if (!state.phone.trim()) {
          errorMessage = 'El campo de teléfono es obligatorio';
        } else if (!/^\d+$/.test(state.phone)) {
          errorMessage = 'El teléfono solo debe contener valores numéricos';         
        } else if (!/^\d{10}$/.test(state.phone)) {
          errorMessage = 'El teléfono debe contener 10 dígitos';
        }
        break;
  
      case 'instagram':
        if (!/^@[a-zA-Z0-9_.]+$/.test(state.instagram)) {
          errorMessage = 'El usuario de Instagram debe empezar con @ y solo puede contener letras, números, puntos y guiones bajos';
        }
        break;
  
      case 'birthdate':
        if (!state.birthdate) {
          errorMessage = 'El campo de fecha de nacimiento es obligatorio';
        } else {
          // const birthdate = new Date(state.birthdate);
          // console.log('birthdate', birthdate);
          const age = new Date().getFullYear() - state.birthdate.getFullYear();
          if (age < 18) {
            errorMessage = 'Debes ser mayor de 18 años';
          }
        }
        break;
  
    //   case 'gender':
    //     if (!state.gender.trim()) {
    //       errorMessage = 'El campo de género es obligatorio';
    //     }
    //     break;
  
      default:
        break;
    }
  
    // Actualizar el estado solo si hay un mensaje de error
    setState((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [field]: errorMessage
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    
    console.log({fullName: state.fullName, password: state.password, email: state.email, phone: state.phone, instagram: state.instagram, birthdate: state.birthdate, gender: state.gender, captchaToken: state.captchaToken});
    let captchaToken = state.captchaToken;
    if (!captchaToken) {
        alert("Por favor complete el reCAPTCHA");
        return;
      }
    
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: state.fullName, password: state.password, email: state.email, phone: state.phone, instagram: state.instagram, birthdate: state.birthdate, gender: state.gender, captchaToken: state.captchaToken }),
      });

      console.log('res', res)

      if (res.ok) {
        alert('Captcha verificado y formulario enviado correctamente');
        await router.push('/loginAdmin');
        alert('¡Tu cuenta está casi lista! Por favor, confirma tu correo antes de iniciar sesión.');
      } else {
        setState({ ...state, error: 'Fallo en la verificación de captcha o envío de registro' });
      }
   } catch (error) {
     console.error('Error en la solicitud:', error);
     setState({
       ...state,
       error: 'Error del servidor. Inténtalo de nuevo más tarde.',
       errors: {}
     });
   }   
};

  return (
    <RegisterForm
      fullName={state.fullName}
      password={state.password}
	    email={state.email} 
	    phone={state.phone} 
	    instagram={state.instagram}
	    birthdate={state.birthdate}
	    gender={state.gender}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      //siteKey={state.siteKey}
      error={state.error}
      errors={state.errors}
    />
  );
}

export default RegisterPage;