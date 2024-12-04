'use client';

// pages/service.js
import ServiceForm from '../../../components/ServiceForm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { use } from 'react'; // Se importa React.use() para desempaquetar params

function editServicePage({ params }) {
 
  const { id } = use(params); // Desempaqueta los parámetros con React.use()
  const router = useRouter();
  
  const [state, setState] = useState({
    id: '',
    name: '',
    description: '',
    duration: '',
    error: '',
    errors: {},
    message: '',
  });
  
  const title = 'Editar servicio';

  useEffect(() => {
    if (id) {
        setState((prevState) => ({ ...prevState, id }));

        // Cargar datos del servicio desde el backend
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
    <ServiceForm
      name={state.name}
      description={state.description}
      price={state.price}
      duration={state.duration}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      error={state.error}
      errors={state.errors}
      message={state.message}
      title={title}
    />
  );
}

export default editServicePage;