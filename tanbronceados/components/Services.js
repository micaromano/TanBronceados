import "bootstrap/dist/css/bootstrap.min.css";
import Service from '../components/Service';
import Table from 'react-bootstrap/Table';
import { Container, Row } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Slide } from "react-toastify";

function Services({
    services,
    onEdit,
    onDeactivate,
}) {
    return (
        <>
            <div className="container mt-4">
                <div className="text-center mb-4">
                    <h4 className="text-secondary">Lista de servicios disponibles</h4>
                </div>
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
                                        <th colSpan="2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map(service => (
                                        <Service
                                            key={service.ServiceID}
                                            {...service}
                                            onEdit={onEdit}
                                            onDeactivate={onDeactivate}
                                        />
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </Container>
                ) : (
                    <div className="text-center my-5">
                        <h5 className="text-muted">No hay servicios disponibles</h5>
                    </div>
                )}
            </div>
            <ToastContainer theme="dark" transition={Slide} position="bottom-center" />
        </>
    );
}

export default Services;
