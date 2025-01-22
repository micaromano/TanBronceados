import "bootstrap/dist/css/bootstrap.min.css";
import Service from '../components/Service';
import Table from 'react-bootstrap/Table';
import { Container, Row } from "react-bootstrap";

function Services({
    services,
    text,  
    onEdit,
    onChange,
}) {
    return (
        <>
            <div
                className="card shadow border-0 p-4"
                style={{
                width: '100%',
                borderRadius: '10px',
                backgroundColor: '#FFF',
                }}
            >
            <h5 className="text-center mb-4"
                style={{ color: '#795D4F', fontWeight: 'bold' }}
            >
                {text.title}
            </h5>
                {services.length > 0 ? (
                    <Container>
                        <Row className="justify-content-center">
                            <Table striped bordered hover responsive className="table-sm">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID Servicio</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Precio</th>
                                        <th>Duración</th>
                                        <th>Hora Desde</th>
                                        <th>Hora Hasta</th>
                                        <th colSpan="2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map(service => (
                                        <Service
                                            key={service.ServiceID}
                                            {...service}
                                            onEdit={onEdit}
                                            onChange={onChange}
                                            action={text.action}
                                        />
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </Container>
                ) : (
                    <div className="text-center my-5">
                        <h5 className="text-muted">{text.noServices}</h5>
                    </div>
                )}
            </div>
        </>
    );
}

export default Services;
