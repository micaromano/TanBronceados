import React from 'react';

function ServiceSelector({ services, selectedService, onChange }) {
  return (
    <div className="service-selector">
      <label htmlFor="service">Seleccionar servicio</label>
      <select
        id="service"
        onChange={onChange}
        value={selectedService?.ServiceName || ''}
      >
        {services.map((service) => (
          <option key={service.ServiceID} value={service.ServiceName}>
            {service.ServiceName} - {service.Duration} min
          </option>
        ))}
      </select>
    </div>
  );
}

export default ServiceSelector;
