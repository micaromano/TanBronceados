// components/Service.js
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/Service.module.css';

function Service({ ServiceID, ServiceName, ServiceDescription, Price, Duration, onEdit, onChange, action }) {
    const [hoverEdit, setHoverEdit] = useState(false);
    const [hoverDelete, setHoverDelete] = useState(false);

    return (
        <>
            <tr className={`${styles.feature}`}>
                <td style={{ border: 'none' }}>{ServiceID}</td>
                <td style={{ border: 'none' }}>{ServiceName}</td>
                <td style={{ border: 'none' }}>{ServiceDescription}</td>
                <td style={{ border: 'none' }}>{Price}</td>
                <td style={{ border: 'none' }}>{Duration}</td>
                <td style={{ border: 'none' }}>                    
                    <Button variant="primary btn-sm"                    
                    style={{
                        fontSize: '13px',
                        padding: '8px 16px',
                        backgroundColor: hoverEdit ? '#cbb7aa' : '#b39b8e',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}  
                    onMouseEnter={() => setHoverEdit(true)}
                    onMouseLeave={() => setHoverEdit(false)}  
                    onClick={() => onEdit(ServiceID)}
                    >
                        Editar
                    </Button>
                </td>
                <td style={{ border: 'none' }}>
                    <Button variant="danger btn-sm"                    
                    
                    style={{
                        fontSize: '13px',
                        padding: '8px 16px',
                        backgroundColor: hoverDelete ? '#92766A' : '#795D4F',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={() => setHoverDelete(true)}
                    onMouseLeave={() => setHoverDelete(false)}
                    onClick={() => onChange(ServiceID, action)}
                    >                
                        {action}
                    </Button>
                </td>
            </tr>
        </>
    )
}

export default Service