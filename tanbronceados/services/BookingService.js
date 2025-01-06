export const fetchServices = async () => {
    const response = await fetch('/api/getServicesList');
    if (!response.ok) throw new Error('Error fetching services');
    return response.json();
  };
  
  export const bookAppointment = async (appointment) => {
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appointment }),
    });
    if (!response.ok) throw new Error('Error booking appointment');
    return response.json();
  };
  