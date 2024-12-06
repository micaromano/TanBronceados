// components/ServiceForm.js
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';

function ServiceForm({
  name,
  description,
  price,
  duration,
  onChange,
  onSubmit,
  onBlur,
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
          <input
            type="text"
            className={`form-control ${
              errors.description ? 'is-invalid' : ''
            }`}
            placeholder="Descripción"
            value={description || ''}
            onChange={(e) => onChange(e, 'description')}
            onBlur={() => onBlur('description')}
            style={{
              backgroundColor: '#F9F9F9',
              borderColor: '#D6D6D6',
              borderRadius: '8px',
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

        {/* Submit Button */}
        <div className="d-grid">
          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: '#795D4F',
              color: '#FFF',
              borderRadius: '8px',
            }}
            disabled={
              !name.trim() || !description.trim() || !price || !duration
            }
          >
            Confirmar
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
      <ToastContainer theme="dark" transition={Slide} position="bottom-center" />
    </div>
  );
}

export default ServiceForm;
