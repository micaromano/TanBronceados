'use client';

// pages/register.js
import RegisterForm from '../../components/RegisterForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function RegisterPage() {
  const [state, setState] = useState({
    fullName: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    instagram: '',
    birthdate: null, // Inicializa birthdate como null para DatePicker
    gender: '',
    captchaToken: null, // Inicializa captchaToken como null para el reCaptcha
    error: '',
    errors: {},
    message: ''
  });
  const router = useRouter();

  const handleChange = (e, field) => {
    let campo = e;
    if (field != 'birthdate' && field != 'captchaToken') {
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
          errorMessage = 'El nombre completo es obligatorio.';
        }
        else if (state.fullName.length < 3) {
          errorMessage = 'El nombre completo debe tener al menos 3 caracteres.';
        }
        break;

      case 'password':
        if (!state.password.trim()) {
          errorMessage = 'La contraseña es obligatoria.';
        } else if (state.password.length < 8) {
          errorMessage = 'La contraseña debe tener al menos 8 caracteres.';
        } else if (!/[A-Z]/.test(state.password)) {
          errorMessage = 'La contraseña debe tener al menos una letra mayúscula.';
        } else if (!/[0-9]/.test(state.password)) {
          errorMessage = 'La contraseña debe tener al menos un número.';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(state.password)) {
          errorMessage = 'La contraseña debe tener al menos un carácter especial.';
        }
        break;

      case 'confirmPassword':
        if (state.password != state.confirmPassword) {
          errorMessage = 'Ambas contraseñas deben ser iguales.';
        }
        break;

      case 'email':
        if (!state.email.trim()) {
          errorMessage = 'El email es obligatorio.';
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(state.email)) {
          errorMessage = 'El formato del email es inválido.';
        }
        break;

      case 'phone':
        if (!state.phone.trim()) {
          errorMessage = 'El celular es obligatorio.';
        } else if (!/^\d+$/.test(state.phone)) {
          errorMessage = 'El celular solo debe contener valores numéricos.';
        } else if (!/^\d{9}$/.test(state.phone)) {
          errorMessage = 'El celular debe contener 9 dígitos.';
        } else if (!/^09/.test(state.phone)) {
          errorMessage = 'El celular debe comenzar con "09".';
        }
        break;

      case 'instagram':
        if (state.instagram) {
          if (!state.instagram.startsWith('@')) {
            errorMessage = 'El usuario de Instagram debe empezar con @.';
          } else if (!/^@[a-zA-Z0-9_.]+$/.test(state.instagram)) {
            errorMessage = 'El usuario de Instagram solo puede contener letras, números, puntos y guiones bajos.';
          }
        }
        break;

      case 'birthdate':
        if (!state.birthdate) {
          errorMessage = 'La fecha de nacimiento es obligatoria.';
        } else {
          const age = new Date().getFullYear() - state.birthdate.getFullYear();
          if (age < 18) {
            errorMessage = 'Debes ser mayor de 18 años.';
          }
        }
        break;

      case 'gender':
        if (!state.gender) {
          errorMessage = 'El género es obligatorio.';
        }
        break;

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

  const clearMessages = () => {
    setState((prevState) => ({
      ...prevState,
      error: '',
      message: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let captchaToken = state.captchaToken;

    // Se verifica que el token existe
    if (!captchaToken) {
      toast("Por favor complete el reCAPTCHA.");
      return;
    }

    // Se envía solicitud de registro con los datos del formulario
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: state.fullName, password: state.password, email: state.email, phone: state.phone, instagram: state.instagram, birthdate: state.birthdate, gender: state.gender, captchaToken: state.captchaToken }),
      });

      if (res.ok) {
        const mess = await res.json();
        setState({ ...state, message: mess.message });
        await toast('¡Tu cuenta está casi lista! Por favor, confirma tu correo antes de iniciar sesión.');

      } else {
        const error = await res.json();
        setState({ ...state, error: error.error });
      }

      // Limpia el mensaje de error después de 3 segundos
      setTimeout(() => {
        clearMessages();
      }, 3000);

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
      confirmPassword={state.confirmPassword}
      email={state.email}
      phone={state.phone}
      instagram={state.instagram}
      birthdate={state.birthdate}
      gender={state.gender}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      error={state.error}
      errors={state.errors}
      message={state.message}
    />
  );
}

export default RegisterPage;