// utils/date.js
  function adjustDate(date, time, event) {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    let newDate = new Date(date + 'T00:00:00');
    newDate.setHours(hours, minutes, seconds);

    if (event == "Recordatorio de cita"){
        // Restamos 24 horas (1 día)
        newDate.setDate(newDate.getDate() - 1);
        return newDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
    } 
    
    if (event == "Recomendación post sesion"){
        newDate.setMinutes(newDate.getMinutes() + 15);
        // Sumamos 15 minutos
        return newDate.toTimeString().split(' ')[0]; // "HH:mm:ss"
    }
  }
  
  module.exports = { adjustDate };