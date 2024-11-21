// components/LoginForm.js
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale("es", es);
import ReCAPTCHA from 'react-google-recaptcha';
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Slide } from "react-toastify";

function RegisterForm({
  fullName,
  password,
  password2,
  email,
  phone,
  instagram,
  birthdate,
  gender,
  onChange,
  onSubmit,
  onBlur,
  error,
  errors,
  message,
}) {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={6}>
          <Card>
            <Card.Body align='center'>
              <img
                src='/TAN.png'
                style={{ width: "40%", height: "40%" }}
              />
            </Card.Body>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <h4 align='center' style={{ color: '#4e4e4e' }}>Regístrate para agendar el servicio.</h4>
                <br></br>
                <Form.Group
                  className="form-floating mb-3"
                  controlId="formBasicName"
                >
                  <Form.Control
                    type="text"
                    placeholder="Nombre completo"
                    value={fullName}
                    onChange={(e) => onChange(e, "fullName")}
                    onBlur={() => onBlur("fullName")}
                    isInvalid={!!errors.fullName}
                  />
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="form-floating mb-3"
                  controlId="formBasicPassword"
                >
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => onChange(e, "password")}
                    onBlur={() => onBlur("password")}
                    isInvalid={!!errors.password}
                  />
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="form-floating mb-3"
                  controlId="formBasicPassword2"
                >
                  <Form.Control
                    type="password"
                    placeholder="Repetir contraseña"
                    value={password2}
                    onChange={(e) => onChange(e, "password2")}
                    onBlur={() => onBlur("password2")}
                    isInvalid={!!errors.password2}
                  />
                  <Form.Label>Repetir contraseña</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {errors.password2}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="form-floating mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => onChange(e, "email")}
                    onBlur={() => onBlur("email")}
                    isInvalid={!!errors.email}
                  />
                  <Form.Label>Email</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="form-floating mb-3"
                  controlId="formBasicPhone"
                >
                  <Form.Control
                    type="text"
                    placeholder="Celular"
                    value={phone}
                    onChange={(e) => onChange(e, "phone")}
                    onBlur={() => onBlur("phone")}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Label>Celular</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="form-floating mb-3"
                  controlId="formBasicInstagram"
                >
                  <Form.Control
                    type="text"
                    placeholder="Instagram"
                    value={instagram}
                    onChange={(e) => onChange(e, "instagram")}
                    onBlur={() => onBlur("instagram")}
                    isInvalid={!!errors.instagram}
                  />
                  <Form.Label>Instagram</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {errors.instagram}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBirthdate">
                  <Form.Label>Fecha de nacimiento</Form.Label><br />
                  <DatePicker
                    selected={birthdate}
                    onChange={(e) => onChange(e, "birthdate")}
                    onBlur={() => onBlur("birthdate")}
                    popperPlacement="right"
                    placeholderText="dd/mm/yyyy"
                    locale="es"
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    className={`form-control ${errors.birthdate ? 'is-invalid' : ''}`}
                  />
                  {errors.birthdate && (
                    <div className="invalid-feedback d-block">
                      {errors.birthdate}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Género</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      label="Masculino"
                      name="gender"
                      value="masculino"
                      checked={gender === "masculino"}
                      onChange={(e) => onChange(e, "gender")}
                      onBlur={() => onBlur("gender")}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Femenino"
                      name="gender"
                      value="femenino"
                      checked={gender === "femenino"}
                      onChange={(e) => onChange(e, "gender")}
                      onBlur={() => onBlur("gender")}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="Otro"
                      name="gender"
                      value="otro"
                      checked={gender === "otro"}
                      onChange={(e) => onChange(e, "gender")}
                      onBlur={() => onBlur("gender")}
                      inline
                    />
                  </div>
                  {errors.gender && (
                    <div className="invalid-feedback d-block">
                      {errors.gender}
                    </div>
                  )}
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={
                    !fullName.trim() ||
                    !password.trim() ||
                    !password2.trim() ||
                    !email.trim() ||
                    !phone.trim() ||
                    !instagram.trim() ||
                    !birthdate ||
                    !gender.trim()
                  }
                  className="w-100"
                >
                  Registrarte
                </Button>

                <br></br>
                <br></br>
                {error && <div className="invalid-feedback d-block">{error}</div>}
                {message && <div className="valid-feedback d-block">{message}</div>}
                <br></br>

                <ReCAPTCHA
                  sitekey='6LdK5HoqAAAAAK4U_6jYKSs7aSWp_RZTPhKZiNpM'
                  onChange={(e) => onChange(e, "captchaToken")}
                  align='center'
                />

              </Form>
            </Card.Body>
          </Card>
          <br></br>
          <Card>
            <Card.Body align='center'>
              <p>¿Tienes una cuenta? <strong><a href="http://localhost:3000/login" style={{ color: '#0095F6' }}>Entrar</a></strong></p>
            </Card.Body>
          </Card>
          <br></br>
        </Col>
      </Row>
      <ToastContainer theme="dark" transition={Slide} position="bottom-center" />
    </Container >
  );
}

export default RegisterForm;
