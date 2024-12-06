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
              console.log('data', data);
              setState((prevState) => ({
                  ...prevState,
                  name: data.ServiceName,
                  description: data.ServiceDescription,
                  price: data.Price,
                  duration: data.Duration,
              }));
          } else {
              console.error('Error al obtener datos del servicio.');
          }
      } catch (error) {
          console.error('Error en la solicitud:', error);
      }
  };

      fetchService();
    }
  }, [id]);

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
    let errorMessage = '';

    // Validaciones específicas por campo
    switch (field) {
      case 'name':
        if (!state.name.trim()) {
          errorMessage = 'El nombre es obligatorio.';
        }
        else if (state.name.length < 3) {
          errorMessage = 'El nombre debe tener al menos 3 caracteres.';
        }
        break;

      case 'description':
        if (!state.description.trim()) {
          errorMessage = 'La descripción es obligatoria.';
        }
        else if (state.description.length < 3) {
          errorMessage = 'La descripción debe tener al menos 3 caracteres.';
        }
        break;

      case 'price':
        if (!state.price) {
          errorMessage = 'El precio es obligatorio.';
        } else if (!/^\d+$/.test(state.price)) {
          errorMessage = 'El precio debe ser un valor númerico.';
        } else if (parseFloat(state.price) <= 0) {
          errorMessage = 'El precio debe ser mayor que cero.';
        }
        break;

      case 'duration':
        if (!state.duration.trim()) {
          errorMessage = 'La duración es obligatoria.';
        } else if (!/^\d+$/.test(state.duration)) {
          errorMessage = 'La duración debe ser un valor númerico.';
        } else if (parseFloat(state.duration) <= 0) {
          errorMessage = 'La duración debe ser mayor que cero.';
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

    console.log('id, name, description, price, duration', state.id, state.name, state.description, state.price, state.duration);

    // Se envía solicitud de edición con los datos del formulario

    try {
      const res = await fetch('/api/editService', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceID: state.id, serviceName: state.name, serviceDescription: state.description, price: state.price, duration: state.duration }),
      });

      if (res.ok) {
        const mess = await res.json();
        setState({ ...state, message: mess.message });
        toast.success('¡Se ha editado el servicio!');

      } else {
        const error = await res.json();
        setState({ ...state, error: error.error });
      }

      // Limpia el mensaje de error después de 3 segundos
      setTimeout(() => {
        clearMessages();
      }, 3000);

      // Se redirige a la lista de servicios después de 5 segundos
      setTimeout(() => {
        router.push('/servicesList');
      }, 5000);

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
