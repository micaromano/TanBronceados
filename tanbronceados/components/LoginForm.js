// components/LoginForm.js
import 'bootstrap/dist/css/bootstrap.min.css'; 

import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

function LoginForm({ username, password, onChange, onSubmit, error }) {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <h3>Login Administrador</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={e => onChange(e, 'username')}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => onChange(e, 'password')}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={!username || !password}
                  className="w-100"
                >
                  Continuar
                </Button>
                {error && <div className="error">{error}</div>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer position="bottom-center" />
    </Container>
  );
}

export default LoginForm;
