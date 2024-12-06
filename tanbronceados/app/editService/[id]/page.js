'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, toast } from 'react-toastify';
import Head from 'next/head';
import Footer from '../../../components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

function EditServicePage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const [state, setState] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    duration: '',
    error: '',
    errors: {},
    message: '',
  });

  useEffect(() => {
    if (id) {
      setState((prevState) => ({ ...prevState, id }));
      const fetchService = async () => {
        try {
          const res = await fetch(`/api/getService?id=${id}`);
          if (res.ok) {
            const data = await res.json();
            setState((prevState) => ({
              ...prevState,
              name: data.ServiceName,
              description: data.ServiceDescription,
              price: data.Price,
              duration: data.Duration,
            }));
          }
        } catch (error) {
          console.error('Error al cargar el servicio:', error);
        }
      };
      fetchService();
    }
  }, [id]);

  const handleChange = (e, field) => {
    setState((prevState) => ({
      ...prevState,
      [field]: e.target.value,
      errors: { ...prevState.errors, [field]: '' },
    }));
  };

  const handleBlur = (field) => {
    let errorMessage = '';
    if (!state[field]?.trim()) {
      errorMessage = `${field.charAt(0).toUpperCase() + field.slice(1)} es obligatorio.`;
    }
    setState((prevState) => ({
      ...prevState,
      errors: { ...prevState.errors, [field]: errorMessage },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/editService', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      });
      if (res.ok) {
        const { message } = await res.json();
        toast.success(message);
        setTimeout(() => router.push('/servicesList'), 3000);
      } else {
        const { error } = await res.json();
        setState((prevState) => ({ ...prevState, error }));
      }
    } catch {
      toast.error('Error al actualizar el servicio.');
    }
  };

  return (
    <>
      <Head>
        <title>Editar Servicio</title>
      </Head>

      <div
        className="d-flex flex-column min-vh-100"
        style={{ backgroundColor: '#F5EDE8' }}
      >
        {/* Header */}
        <header
          className="py-3"
          style={{ backgroundColor: '#795D4F', color: '#FFF' }}
        >
          <div className="container d-flex justify-content-between">
            <a href="/servicesList" className="text-white text-decoration-none">
              Volver
            </a>
          </div>
        </header>

        {/* Main Content */}
        <div className="container d-flex flex-grow-1 align-items-center justify-content-center">
          <div
            className="card shadow border-0 p-4"
            style={{
              maxWidth: '500px',
              width: '100%',
              borderRadius: '10px',
              backgroundColor: '#FFF',
            }}
          >
            <h5
              className="text-center mb-4"
              style={{ color: '#795D4F', fontWeight: 'bold' }}
            >
              Editar Servicio
            </h5>
            <form onSubmit={handleSubmit}>
              {['name', 'description', 'price', 'duration'].map((field) => (
                <div className="form-floating mb-3" key={field}>
                  <input
                    type="text"
                    className={`form-control ${
                      state.errors[field] ? 'is-invalid' : ''
                    }`}
                    placeholder={field}
                    value={state[field]}
                    onChange={(e) => handleChange(e, field)}
                    onBlur={() => handleBlur(field)}
                    style={{
                      backgroundColor: '#F9F9F9',
                      borderColor: '#D6D6D6',
                      borderRadius: '8px',
                    }}
                  />
                  <label htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {state.errors[field] && (
                    <div className="invalid-feedback d-block">
                      {state.errors[field]}
                    </div>
                  )}
                </div>
              ))}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn"
                  style={{
                    backgroundColor: hover ? '#92766A' : '#795D4F',
                    color: '#FFF',
                    borderRadius: '8px',
                  }}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  Guardar Cambios
                </button>
              </div>
              {state.error && (
                <div className="text-danger text-center mt-3">
                  {state.error}
                </div>
              )}
              {state.message && (
                <div className="text-success text-center mt-3">
                  {state.message}
                </div>
              )}
            </form>
          </div>
        </div>

        <Footer />
        <ToastContainer position="bottom-center" />
      </div>
    </>
  );
}

export default EditServicePage;
