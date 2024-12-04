'use client';

// pages/service.js
import Services from '../../components/Services';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ServicesList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/getServicesList'); // Ruta de tu API
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        const dataServices = await response.json();
        console.log('dataServices', dataServices);

        setServices(dataServices); // Actualiza el estado con los servicios obtenidos
      } catch (error) {
        console.error('Error al obtener servicios:', error);
      }
    };

    fetchServices();

    console.log('services', services);
    
  }, []); // Con el array vacío se asegura que la solicitud se realice solo una vez
  
  const router = useRouter();

  const handleEdit = (ServiceID) => {
    router.push(`/editService/${ServiceID}`);
  }

  const handleDeactivate = async (ServiceID) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      return;
    }

    try {
      const response = await fetch(`api/deactivateService/${ServiceID}`, {
        method: 'PUT',
      });
      console.log('response', response);
      
      if(response.ok){
        setServices((prevServices) => prevServices.filter((s) => s.ServiceID !== ServiceID));
        console.log('services', services);

        toast.success('Servicio eliminado con éxito');
      } else {
        const error = await response.json();
        toast.error(`Error al eliminar servicio: ${error.error}`);
      }

    } catch (error) {
      console.error('Error al eliminar servicio:', error);
      toast.error('Error del servidor. Intenta nuevamente.');
    }
  }

  return (
    <Services
      services={services}
      onEdit={handleEdit} 
      onDeactivate={handleDeactivate}  
    />
  );

};

export default ServicesList;