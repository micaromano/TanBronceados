'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify';
import Head from 'next/head';
import Footer from '../../components/Footer';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ServiceForm from '../../components/ServiceForm';

function ServicePage() { 
  const [state, setState] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    horaDesde: '',
    horaHasta: '',
    error: '',
    errors: {},
    message: '',
  });
  
  const router = useRouter();
  const title = 'Crear un Servicio Nuevo';
  const [hover, setHover] = useState(false);

  const handleChange = (e, field) => {
    setState({
      ...state,
      [field]: e.target.value,
      errors: {
        ...state.errors,
        [field]: '', // Limpiar el error al cambiar el valor
      },
    });
  };

  const handleBlur = (field) => {
    let errorMessage = '';

    switch (field) {
      case 'name':
        if (!state.name.trim()) {
          errorMessage = 'El nombre es obligatorio.';
        } else if (state.name.length < 3) {
          errorMessage = 'El nombre debe tener al menos 3 caracteres.';
        }
        break;

      case 'description':
        if (!state.description.trim()) {
          errorMessage = 'La descripción es obligatoria.';
        } else if (state.description.length < 3) {
          errorMessage = 'La descripción debe tener al menos 3 caracteres.';
        }
        break;

      case 'price':
        if (!state.price) {
          errorMessage = 'El precio es obligatorio.';
        } else if (parseFloat(state.price) <= 0) {
          errorMessage = 'El precio debe ser mayor que cero.';
        } else if (!/^\d+$/.test(state.price)) {
          errorMessage = 'El precio debe ser un valor númerico.';
        }
        break;

      case 'duration':
        if (!state.duration) {
          errorMessage = 'La duración es obligatoria.';
        } else if (parseFloat(state.duration) <= 0) {
          errorMessage = 'La duración debe ser mayor que cero.';
        } else if (!/^\d+$/.test(state.duration)) {
          errorMessage = 'La duración debe ser un valor númerico.';
        }
        break;
        
      case 'horaDesde':
        if (!state.horaDesde) {
          errorMessage = 'La horaDesde es obligatoria.';
        } else if (parseFloat(state.horaDesde) <= 0) {
          errorMessage = 'La horaDesde debe ser mayor que cero.';
        } else if (!/^\d+$/.test(state.horaDesde)) {
          errorMessage = 'La horaDesde debe ser un valor númerico.';
        } else if (parseFloat(state.horaDesde) >= 24) {
          errorMessage = 'La horaDesde debe ser menor a 24.';
        }
        break;

      case 'horaHasta':
        if (!state.horaHasta) {
          errorMessage = 'La horaHasta es obligatoria.';
        } else if (parseFloat(state.horaHasta) <= 0) {
          errorMessage = 'La horaHasta debe ser mayor que cero.';
        } else if (!/^\d+$/.test(state.horaHasta)) {
          errorMessage = 'La horaHasta debe ser un valor númerico.';
        } else if (parseFloat(state.horaHasta) <= parseFloat(state.horaDesde)) {
          errorMessage = 'La horaHasta debe ser mayor a la horaDesde.';
        }
        break;

      default:
        break;
    }

    setState((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [field]: errorMessage,
      },
    }));
  };

  const clearMessages = () => {
    setState((prevState) => ({
      ...prevState,
      error: '',
      message: '',
    }));
  };

  const handleHover = (state) => {
    setHover(state);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.name,
          description: state.description,
          price: state.price,
          duration: state.duration,
          horaDesde: state.horaDesde,
          horaHasta: state.horaHasta,
        }),
      });

      if (res.ok) {
        const mess = await res.json();
        setState({ ...state, message: mess.message });
        await toast.success('¡Se ha dado de alta un servicio!');

      } else {
        const error = await res.json();
        setState({ ...state, error: error.error });
      }

      // Limpia el mensaje de error después de 3 segundos
      setTimeout(() => {
        clearMessages();
      }, 3000);

      setTimeout(() => {
        router.push('/servicesList');
      }, 5000);

    } catch (error) {
      console.error('Error en la solicitud:', error);
      setState({
        ...state,
        error: 'Error del servidor. Inténtalo de nuevo más tarde.',
        errors: {},
      });
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
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
          <ServiceForm
            name={state.name}
            description={state.description}
            price={state.price}
            duration={state.duration}
            horaDesde={state.horaDesde}
            horaHasta={state.horaHasta}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onBlur={handleBlur}
            onHover={handleHover}
            hover={hover}
            error={state.error}
            errors={state.errors}
            message={state.message}
            title={title}
          />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default ServicePage;
