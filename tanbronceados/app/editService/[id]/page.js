'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify';
import Head from 'next/head';
import Footer from '../../../components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import ServiceForm from '../../../components/ServiceForm';

function EditServicePage({ params }) {
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

  const { id } = use(params);
  const router = useRouter();
  const title = 'Editar Servicio';
  const [hover, setHover] = useState(false);

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

  const handleHover = (state) => {
    setHover(state);
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
          <ServiceForm
            name={state.name}
            description={state.description}
            price={state.price}
            duration={state.duration}
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

export default EditServicePage;
