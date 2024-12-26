'use client';
import '../../styles/a.css';

function A() {
    return (
        <div className="card-container">
            <div className="card">
                <h1>Reserva realizada con éxito!</h1>
                <button className="btn-home" onClick={() => (window.location.href = '/')}>
                    Volver al inicio
                </button>
            </div>
        </div>
    );
}

export default A;
