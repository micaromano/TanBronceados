// components/ServiceForm.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';

function ServiceForm({
  name,
  description,
  price,
  duration,
  horaDesde,
  horaHasta,
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
        {/* Name Field */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Nombre"
            value={name || ''}
            onChange={(e) => onChange(e, 'name')}
            onBlur={() => onBlur('name')}
            style={{
              backgroundColor: '#F9F9F9',
              borderColor: '#D6D6D6',
              borderRadius: '8px',
            }}
          />
          <label>Nombre</label>
          {errors.name && (
            <div className="invalid-feedback d-block">{errors.name}</div>
          )}
        </div>

        {/* Description Field */}
        <div className="form-floating mb-3">
          <textarea
            type="text"
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            placeholder="Descripción"
            value={description || ''}
            onChange={(e) => onChange(e, 'description')}
            onBlur={() => onBlur('description')}
            style={{
              backgroundColor: '#F9F9F9',
              borderColor: '#D6D6D6',
              borderRadius: '8px',
              height: '120px',
            }}
          />
          <label>Descripción</label>
          {errors.description && (
            <div className="invalid-feedback d-block">
              {errors.description}
            </div>
          )}
        </div>

        {/* Price Field */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            placeholder="Precio"
            value={price || ''}
            onChange={(e) => onChange(e, 'price')}
            onBlur={() => onBlur('price')}
            style={{
              backgroundColor: '#F9F9F9',
              borderColor: '#D6D6D6',
              borderRadius: '8px',
            }}
          />
          <label>Precio</label>
          {errors.price && (
            <div className="invalid-feedback d-block">{errors.price}</div>
          )}
        </div>

        {/* Duration Field */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
            placeholder="Duración"
            value={duration || ''}
            onChange={(e) => onChange(e, 'duration')}
            onBlur={() => onBlur('duration')}
            style={{
              backgroundColor: '#F9F9F9',
              borderColor: '#D6D6D6',
              borderRadius: '8px',
            }}
          />
          <label>Duración</label>
          {errors.duration && (
            <div className="invalid-feedback d-block">{errors.duration}</div>
          )}
        </div>

        {/* horaDesde Field */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control ${errors.horaDesde ? 'is-invalid' : ''}`}
            placeholder="Horario desde"
            value={horaDesde || ''}
            onChange={(e) => onChange(e, 'horaDesde')}
            onBlur={() => onBlur('horaDesde')}
            style={{
              backgroundColor: '#F9F9F9',
              borderColor: '#D6D6D6',
              borderRadius: '8px',
            }}
          />
          <label>Horario desde</label>
          {errors.horaDesde && (
            <div className="invalid-feedback d-block">{errors.horaDesde}</div>
          )}
        </div>

        {/* horaHasta Field */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control ${errors.horaHasta ? 'is-invalid' : ''}`}
            placeholder="Horario hasta"
            value={horaHasta || ''}
            onChange={(e) => onChange(e, 'horaHasta')}
            onBlur={() => onBlur('horaHasta')}
            style={{
              backgroundColor: '#F9F9F9',
              borderColor: '#D6D6D6',
              borderRadius: '8px',
            }}
          />
          <label>Horario hasta</label>
          {errors.horaHasta && (
            <div className="invalid-feedback d-block">{errors.horaHasta}</div>
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
              !name.trim() || !description.trim() || !price || !duration || !horaDesde || !horaHasta 
            }
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
          >
            Guardar Cambios
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

export default ServiceForm;
