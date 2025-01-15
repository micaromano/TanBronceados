import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';

function DisableForm({
  fechaDesde,
  horarioDesde,
  fechaHasta,
  horarioHasta,
  serviceID,
  onChange,
  onSubmit,
  onBlur,
  onHover,
  hover,
  error,
  errors,
  message,
  title,
}) {
  return (
    <div
      className="card shadow border-0 p-4"
      style={{
        maxWidth: '500px',
        width: '100%',
        borderRadius: '10px',
        backgroundColor: '#FFF',
      }}
    >
      <h5
        className="text-center mb-4"
        style={{ color: '#795D4F', fontWeight: 'bold' }}
      >
        {title}
      </h5>
      <form onSubmit={onSubmit}>
        {/* FechaDesde Field */}
        <div className="form-floating mb-3">
          <input
            type="date"
            className={`form-control ${errors.fechaDesde ? 'is-invalid' : ''}`}
            placeholder="Fecha desde"
            value={fechaDesde || ''}
            onChange={(e) => onChange(e, 'fechaDesde')}
            onBlur={() => onBlur('fechaDesde')}
            style={{
              backgroundColor: '#F9F9F9',
              borderColor: '#D6D6D6',
              borderRadius: '8px',
            }}
          />
          <label>Fecha desde</label>
          {errors.fechaDesde && (
            <div className="invalid-feedback d-block">{errors.fechaDesde}</div>
          )}
        </div>

        {/* HorarioDesde Field */}
        <div className="form-floating mb-3">
          <textarea
            type="int"
            className={`form-control ${errors.horarioDesde ? 'is-invalid' : ''}`}
            placeholder="Horario Desde"
            value={horarioDesde || ''}
            onChange={(e) => onChange(e, 'horarioDesde')}
            onBlur={() => onBlur('horarioDesde')}
            style={{
              backgroundColor: '#F9F9F9',
              borderColor: '#D6D6D6',
              borderRadius: '8px',
              height: '120px',
            }}
          />
          <label>Horario Desde</label>
          {errors.horarioDesde && (
            <div className="invalid-feedback d-block">
              {errors.horarioDesde}
            </div>
          )}
        </div>

        {/* FechaHasta Field */}
        <div className="form-floating mb-3">
          <input
            type="date"
            className={`form-control ${errors.fechaHasta ? 'is-invalid' : ''}`}
            placeholder="Fecha Hasta"
            value={fechaHasta || ''}
            onChange={(e) => onChange(e, 'fechaHasta')}
            onBlur={() => onBlur('fechaHasta')}
            style={{
              backgroundColor: '#F9F9F9',
              borderColor: '#D6D6D6',
              borderRadius: '8px',
            }}
          />
          <label>Fecha Hasta</label>
          {errors.fechaHasta && (
            <div className="invalid-feedback d-block">{errors.fechaHasta}</div>
          )}
        </div>

        {/* HorarioHasta Field */}
        <div className="form-floating mb-3">
          <input
            type="int"
            className={`form-control ${errors.horarioHasta ? 'is-invalid' : ''}`}
            placeholder="Horario Hasta"
            value={horarioHasta || ''}
            onChange={(e) => onChange(e, 'horarioHasta')}
            onBlur={() => onBlur('horarioHasta')}
            style={{
              backgroundColor: '#F9F9F9',
              borderColor: '#D6D6D6',
              borderRadius: '8px',
            }}
          />
          <label>Horario Hasta</label>
          {errors.horarioHasta && (
            <div className="invalid-feedback d-block">{errors.horarioHasta}</div>
          )}
        </div>

        {/* ServiceID Field */}
        <div className="form-floating mb-3">
          <input
            type="int"
            className={`form-control ${errors.serviceID ? 'is-invalid' : ''}`}
            placeholder="ServiceID"
            value={serviceID || ''}
            onChange={(e) => onChange(e, 'serviceID')}
            onBlur={() => onBlur('serviceID')}
            style={{
              backgroundColor: '#F9F9F9',
              borderColor: '#D6D6D6',
              borderRadius: '8px',
            }}
          />
          <label>Servicio</label>
          {errors.serviceID && (
            <div className="invalid-feedback d-block">{errors.serviceID}</div>
          )}
        </div>

        {/* Submit Button */}
        <div className="d-grid">
          <button
            type="submit"
            className="btn"
            style={{
              // backgroundColor: '#795D4F',
              backgroundColor: hover ? '#92766A' : '#795D4F',
              color: '#FFF',
              borderRadius: '8px',
            }}
            disabled={
              !fechaDesde.trim() || !horarioDesde.trim() || !fechaHasta.trim() || !horarioHasta.trim() || !serviceID.trim() 
            }
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
          >
            Deshabilitar
          </button>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="text-danger text-center mt-3">{error}</div>
        )}
        {message && (
          <div className="text-success text-center mt-3">{message}</div>
        )}
      </form>
      <ToastContainer transition={Slide} position="bottom-center" />
    </div>
  );
}

export default DisableForm;