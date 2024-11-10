'use client';

// pages/login.js
import LoginForm from '../../components/LoginForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

function LoginPage() {
  const [state, setState] = useState({
    username: '',
    password: '',
    error: '',
    errors: {}
  });
  const router = useRouter();

  const handleChange = (e, field) => {
    setState({
      ...state,
      [field]: e.target.value,
      errors: {
        ...state.errors,
        [field]: '' // Limpiar el error al cambiar el valor
      }
    });
  };

  const handleBlur = (field) => {
    if (!state[field].trim()) {
      setState({
        ...state,
        errors: {
          ...state.errors,
          [field]: `El campo de ${field === 'username' ? 'usuario' : 'contraseña'} es obligatorio`
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/loginAdmin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: state.username, password: state.password }),
    });

    let errors = {};
    if (!state.username.trim()) {
      errors.username = 'El campo de usuario es obligatorio';
    }
    if (!state.password.trim()) {
      errors.password = 'El campo de contraseña es obligatorio';
    }
    if (Object.keys(errors).length > 0) {
      setState({
        ...state,
        errors
      });
      return;
    }

    try {
      const res = await fetch('/api/loginAdmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: state.username, password: state.password }),
      });

      if (res.ok) {
        const { token } = await res.json();
      // Guardar el token en una cookie en lugar de localStorage
      Cookies.set('token', token, { expires: 1, sameSite: 'strict' }); //Cookies.remove('token'); cuando el usuario cierre sesion agregar secure: true despues
        router.push('/homeAdmin');
      } else {
        const data = await res.json();
        setState({
          ...state,
            error: data.error || 'Usuario y/o contraseña invalido',
            errors: {} // Limpiar errores de validación
          });
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
    <LoginForm
      username={state.username}
      password={state.password}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      error={state.error}
      errors={state.errors}
    />
  );
}

export default LoginPage;
