// components/LoginForm.js
import 'bootstrap/dist/css/bootstrap.min.css'; 

import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

function LoginForm({ username, password, onChange, onSubmit, onBlur, error, errors }) {
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
                    onBlur={() => onBlur('username')}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => onChange(e, 'password')}
                    onBlur={() => onBlur('password')}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {error && <div className="text-danger mb-3 text-center">{error}</div>}

                <Button
                  variant="primary"
                  type="submit"
                  disabled={!username.trim() || !password.trim()}
                  className="w-100"
                >
                  Continuar
                </Button>
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
