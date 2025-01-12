export const fetchServices = async () => {
    try {
      const response = await fetch('/api/getServicesList', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener la lista de servicios');
      }
  
      const data = await response.json();
      // Si el backend devuelve directamente un array, haz:
      return data; // <---- Asegúrate de retornar data sin el ".services"
    } catch (error) {
      console.error('Error en fetchServices:', error);
      throw error;
    }
  };  
  
  export const bookAppointment = async (appointmentData) => {
    try {
      const response = await fetch('/api/bookAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al procesar la reserva');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error al reservar:', error);
      throw error;
    }
  };
  