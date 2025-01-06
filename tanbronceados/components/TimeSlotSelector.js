import React from 'react';

function TimeSlotSelector({ timeSlots, selectedTime, onTimeClick }) {
  return (
    <div className="time-selector">
      <label>Horarios disponibles</label>
      <div className="time-slots">
        {timeSlots.map((time, index) => (
          <button
            key={index}
            className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
            onClick={() => onTimeClick(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TimeSlotSelector;
