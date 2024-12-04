// components/ServiceForm.js
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Slide } from "react-toastify";

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
    <Container>
      <Row className="justify-content-center">
        <Col xs={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <h4 align='center' style={{ color: '#4e4e4e' }}>{title}</h4>
                <br></br>
                <Form.Group
                  className="form-floating mb-3"
                  controlId="formBasicName"
                >
                  <Form.Control
                    type="text"
                    placeholder="Nombre"
                    value={name || ''}
                    onChange={(e) => onChange(e, "name")}
                    onBlur={() => onBlur("name")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="form-floating mb-3"
                  controlId="formBasicDescription"
                >
                  <Form.Control
                    type="text"
                    placeholder="Descripcion"
                    value={description || ''}
                    onChange={(e) => onChange(e, "description")}
                    onBlur={() => onBlur("description")}
                    isInvalid={!!errors.description}
                  />
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="form-floating mb-3"
                  controlId="formBasicPrice"
                >
                  <Form.Control
                    type="text"
                    placeholder="Precio"
                    value={price || ''}
                    onChange={(e) => onChange(e, "price")}
                    onBlur={() => onBlur("price")}
                    isInvalid={!!errors.price}
                  />
                  <Form.Label>Precio</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="form-floating mb-3"
                  controlId="formBasicDuration"
                >
                  <Form.Control
                    type="text"
                    placeholder="Duracion"
                    value={duration || ''}
                    onChange={(e) => onChange(e, "duration")}
                    onBlur={() => onBlur("duration")}
                    isInvalid={!!errors.duration}
                  />
                  <Form.Label>Duracion</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {errors.duration}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={
                    !name.trim() ||
                    !description.trim() ||
                    !price ||
                    !duration
                  }
                  className="w-100"
                >
                  Confirmar
                </Button>

                <br></br>
                <br></br>
                {error && <div className="invalid-feedback d-block">{error}</div>}
                {message && <div className="valid-feedback d-block">{message}</div>}

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer theme="dark" transition={Slide} position="bottom-center" />
    </Container >
  );
}

export default ServiceForm;
