'use client';

import { useEffect } from 'react'

function ConfirmationAccountSuccess() {
    useEffect(() => {
        // Opcional: Redirige automáticamente al login después de unos segundos
        setTimeout(() => {
            window.location.href = '/login';
        }, 3000);
    }, []);

    return (
        <div align='center'>
            <h3>¡Cuenta confirmada con éxito!</h3>
            <h4>Serás redirigido automáticamente al inicio de sesión en unos momentos.</h4>
        </div>
    );
}

export default ConfirmationAccountSuccess;