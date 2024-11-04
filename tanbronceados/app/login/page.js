'use client';// Indica que este archivo es un componente cliente en Next.js 

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function LoginPage() {
  const router = useRouter(); // Instancia de router para redirigir a otras rutas
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado de recargar la página
    
    // Realiza una solicitud a la API de inicio de sesión
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const { token } = await res.json();
      //TODO: se puede poner en una cookie porque es medio inseguro hacer en el local store o session store para que cuando cierre el browser se borre
      localStorage.setItem('token', token); // Extrae el token de la respuesta JSON y lo almacena en el almacenamiento local 
      router.push('/homeAdmin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginPage; // Exporta el componente LoginPage para su uso en otras partes de la aplicación
