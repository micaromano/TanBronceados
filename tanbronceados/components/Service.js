// components/Service.js
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react'
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';

function Service({ ServiceID, ServiceName, ServiceDescription, Price, Duration, onEdit, onDeactivate }) {
    return (
        <>
            <tr>
                <td>{ServiceID}</td>
                <td>{ServiceName}</td>
                <td>{ServiceDescription}</td>
                <td>{Price}</td>
                <td>{Duration}</td>
                <td>                    
                    <Button variant="primary btn-sm"                    
                    onClick={() => onEdit(ServiceID)}>
                        Editar
                    </Button>
                </td>
                <td>
                    <Button variant="danger btn-sm"                    
                    onClick={() => onDeactivate(ServiceID)}>                
                        Eliminar
                    </Button>
                </td>
            </tr>
        </>
    )
}

export default Service