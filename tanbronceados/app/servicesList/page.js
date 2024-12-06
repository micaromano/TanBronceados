'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from "react-toastify";
import Head from 'next/head';
//import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Services from '../../components/Services';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ServicesList = () => {
  const [services, setServices] = useState([]);
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
        setServices(dataServices);
      } catch (error) {
        console.error('Error al obtener servicios:', error);
      }
    };

    fetchServices();
  }, []);

  const handleEdit = (ServiceID) => {
    router.push(`/editService/${ServiceID}`);
  };

  const handleDeactivate = async (ServiceID) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      return;
    }

    try {
      const response = await fetch(`/api/deactivateService/${ServiceID}`, {
        method: 'PUT',
      });
      if (response.ok) {
        setServices((prevServices) =>
          prevServices.filter((s) => s.ServiceID !== ServiceID)
        );
        toast.success('Servicio eliminado con éxito');
      } else {
        const error = await response.json();
        toast.error(`Error al eliminar servicio: ${error.error}`);
      }
    } catch (error) {
      console.error('Error al eliminar servicio:', error);
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
            services={services}
            onEdit={handleEdit}
            onDeactivate={handleDeactivate}
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
        <Footer />
        <ToastContainer position="bottom-center" />
      </div>
    </>
  );
};

export default ServicesList;
