'use client';

// pages/login.js
import LoginForm from '../../components/LoginForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function LoginPage() {
  const [state, setState] = useState({
    username: '',
    password: '',
    error: ''
  });
  const router = useRouter();

  const handleChange = (e, field) => {
    setState({ ...state, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: state.username, password: state.password }),
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('token', token);
      router.push('/homeAdmin');
    } else {
      setState({ ...state, error: 'Invalid credentials' });
    }
  };

  return (
    <LoginForm
      username={state.username}
      password={state.password}
      onChange={handleChange}
      onSubmit={handleSubmit}
      error={state.error}
    />
  );
}

export default LoginPage;

