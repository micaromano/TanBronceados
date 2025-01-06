import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function DateSelector({ selectedDate, onChange }) {
  return (
    <div className="date-selector">
      <label>Seleccionar día</label>
      <Calendar
        onChange={onChange}
        value={selectedDate}
        locale="es-ES"
        minDate={new Date()}
      />
    </div>
  );
}

export default DateSelector;
