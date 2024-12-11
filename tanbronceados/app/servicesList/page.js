'use client';

import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Slide } from 'react-toastify';
import Head from 'next/head';
//import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Services from '../../components/Services';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ServicesList = () => {
  const [activeServices, setActiveServices] = useState([]);
  const [inactiveServices, setInactiveServices] = useState([]);
  const router = useRouter();
  const [hoverCreate, setHoverCreate] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/getServicesList');
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        const dataServices = await response.json();
        setActiveServices(dataServices.filter((s) => s.isActive == 1));
        setInactiveServices(dataServices.filter((s) => s.isActive == 0));
      } catch (error) {
        console.error('Error al obtener servicios:', error);
      }
    };

    fetchServices();
  }, []);

  const handleEdit = (ServiceID) => {
    router.push(`/editService/${ServiceID}`);
  };

  const confirmServiceState = (ServiceID, stateName) => {
    setServiceChange(true);
    let message = '';
    if (stateName == "Deshabilitar"){
      message = '¿Estás seguro de que deseas deshabilitar este servicio?';
    } else {
      message = '¿Estás seguro de que deseas habilitar este servicio?';
    }
    Swal.fire({
      title: message,
      //text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      //confirmButtonColor: '#3085d6',
      confirmButtonColor: '#795D4F',
      //cancelButtonColor: '#d33',
      cancelButtonColor: '#b39b8e',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed && stateName == "Deshabilitar") {
          handleDeactivate(ServiceID);
          Swal.fire('¡Confirmado!', 'Tu acción fue realizada.', 'success');
        }
        if (result.isConfirmed && stateName == "Habilitar") {
          handleActivate(ServiceID);
          Swal.fire('¡Confirmado!', 'Tu acción fue realizada.', 'success');
        }
    });
  }

  const handleDeactivate = async (ServiceID) => {

    try {
      const response = await fetch(`/api/deactivateService/${ServiceID}`, {
        method: 'PUT',
      });
      if (response.ok) {
        setActiveServices((prevServices) =>
          prevServices.filter((s) => s.ServiceID !== ServiceID)
        );
        toast.success('Servicio deshabilitado con éxito');
      } else {
        const error = await response.json();
        toast.error(`Error al deshabilitar servicio: ${error.error}`);
      }
    } catch (error) {
      console.error('Error al deshabilitar servicio:', error);
      toast.error('Error del servidor. Intenta nuevamente.');
    }
  };

  const handleActivate = async (ServiceID) => {

    try {
      const response = await fetch(`/api/activateService/${ServiceID}`, {
        method: 'PUT',
      });
      if (response.ok) {
        setInactiveServices((prevServices) =>
          prevServices.filter((s) => s.ServiceID !== ServiceID)
        );
        toast.success('Servicio habilitado con éxito');
      } else {
        const error = await response.json();
        toast.error(`Error al habilitar servicio: ${error.error}`);
      }
    } catch (error) {
      console.error('Error al habilitar servicio:', error);
      toast.error('Error del servidor. Intenta nuevamente.');
    }
  };

  const handleRedirectToCreateService = () => {
    router.push('/createService');
  };

  return (
    <>
      <Head>

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,300italic,400italic" />
      </Head>
      <div className="d-flex flex-column min-vh-100">
      
        <div className="flex-grow-1 container mt-5">
          <h2 className="text-center mb-4 pt-5">Gestión de Servicios</h2>
          <Services
            services={activeServices}
            title={"Lista de servicios disponibles"}
            stateName={"Deshabilitar"}
            onEdit={handleEdit}
            onChange={confirmServiceState}
          />
          <Services
            services={inactiveServices}
            title={"Lista de servicios deshabilitados"}
            stateName={"Habilitar"}
            onEdit={handleEdit}
            onChange={confirmServiceState}
          />
        <div className="mt-5 text-center">
            <h4 className="mb-3" style={{ color: '#795D4F' }}>
              Dar de alta un Nuevo Servicio
            </h4>
            <button
              className="btn btn-primary mb-5"
              style={{
                backgroundColor: hoverCreate ? '#92766A' : '#795D4F',
                borderColor: '#795D4F',
                color: '#FFF',
              }}
              onMouseEnter={() => setHoverCreate(true)}
              onMouseLeave={() => setHoverCreate(false)}
              onClick={handleRedirectToCreateService}
            >
              Crear Nuevo Servicio
            </button>
          </div>
        </div>
        <ToastContainer transition={Slide} position="bottom-center" />
        <Footer />
      </div>
    </>
  );
};

export default ServicesList;
