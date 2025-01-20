'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify';
import Head from 'next/head';
import Footer from '../../components/Footer';
import DisableForm from '@/components/DisableForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function DisableSchedules() { 
    const [state, setState] = useState({
        fechaDesde: '',
        horarioDesde: '',
        fechaHasta: '',
        horarioHasta: '',
        servicioID: '',
        error: '',
        errors: {},
        message: '',
      });

    const router = useRouter();
    const [hover, setHover] = useState(false);

    // Maneja el cambio de valores en los inputs
    const handleChange = (e, field) => {
        let campo = e;
        setState({
          ...state,
          [field]: campo,
          errors: {
            ...state.errors,
            [field]: '' // Limpiar el error al cambiar el valor
          }
        });
      };

     // validación cuando un input "pierde el foco"
    const handleBlur = (field) => {
        let errorMessage = '';
        const { fechaDesde, horarioDesde, fechaHasta, horarioHasta, servicioID } = state;
    
        // 1. Validación de campos requeridos
        if (!fechaDesde || !horarioDesde || !fechaHasta || !horarioHasta || !servicioID) {
          errorMessage = 'Todos los campos son requeridos';
        } else {
          // 2. Validar formato de fecha/hora
          const fromDateTime = new Date(`${fechaDesde}T${horarioDesde}`);
          const toDateTime = new Date(`${fechaHasta}T${horarioHasta}`);
    
          if (isNaN(fromDateTime.getTime()) || isNaN(toDateTime.getTime())) {
            errorMessage = 'Los valores de fecha y hora no son válidos';
          } 
          // 3. Validar que la fecha/hora "desde" sea anterior a la "hasta"
          else if (fromDateTime >= toDateTime) {
            errorMessage = 'El "HorarioDesde" debe ser anterior al "HorarioHasta" y "FechaDesde" debe ser anterior o igual a "FechaHasta"';
          }
        }
        
        // 4. Actualizar el estado con el error (si existe)
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

        console.log('fechaDesde, horarioDesde, fechaHasta, horarioHasta, serviceID', state.fechaDesde, state.horarioDesde, state.fechaHasta, state.horarioHasta, state.serviceID)
        
        try {
            const res = await fetch('/api/createDisableSchedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fechaDesde: state.fechaDesde, horarioDesde: state.horarioDesde, fechaHasta: state.fechaHasta, horarioHasta: state.horarioHasta, serviceID: state.serviceID}),
            });

            if (res.ok) {
                const mess = await res.json();
                setState({ ...state, message: mess.message });
                await toast.success('El horario indicado fue bloqueado');
        
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

            <>
      <Head>
        <title>Deshabilitar Horarios</title>
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
            <a href="/" className="text-white text-decoration-none">
              Volver
            </a>
          </div>
        </header>

        {/* Main Content */}
        <div className="container d-flex flex-grow-1 align-items-center justify-content-center">
        <DisableForm
              fechaDesde={state.fechaDesde}
              horarioDesde={state.horarioDesde}
              fechaHasta={state.fechaHasta}
              serviceID={state.serviceID}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onBlur={handleBlur}
              onHover={handleHover}
              hover={hover}
              error={state.error}
              errors={state.errors}
              message={state.message}

            />
        </div>
        <Footer />
      </div>
    </>

            
          );
        }
        
    export default DisableSchedules;



        

