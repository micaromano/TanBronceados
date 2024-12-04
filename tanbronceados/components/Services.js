// components/Services.js
import "bootstrap/dist/css/bootstrap.min.css";
import Service from '../components/Service'
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
            <br/>
            {console.log('services', services)}
            <h4 align='center' style={{ color: '#4e4e4e' }}>Lista de servicios disponibles</h4>
            <br/>
            {services.length > 0 ?
            <Container>
                <Row className="justify-content-center">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>idServicio</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Precio</th>
                            <th>Duracion</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            services?.map(service => <Service key={service.ServiceID} {...service} onEdit={onEdit} onDeactivate={onDeactivate} />)
                        }
                    </tbody>
                </Table>
                </Row>
                <ToastContainer theme="dark" transition={Slide} position="bottom-center" />
            </Container > : <div></div>
                
            }
        </>
    );
  }
  
  export default Services;