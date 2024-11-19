// components/LoginForm.js
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale("es", es);
import ReCAPTCHA from 'react-google-recaptcha';
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";

function LoginForm({
  fullName,
  password,
  email,
  phone,
  instagram,
  birthdate,
  gender,
  onChange,
  onSubmit,
  onBlur,
  //siteKey,
  error,
  errors,
}) {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <h3>Registro</h3>
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
                    placeholder="Telefono"
                    value={phone}
                    onChange={(e) => onChange(e, "phone")}
                    onBlur={() => onBlur("phone")}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Label>Telefono</Form.Label>
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
                  <DatePicker
                    selected={birthdate}
                    onChange={(e) => onChange(e, "birthdate")}
                    onBlur={() => onBlur("birthdate")}
                    placeholderText="Fecha de nacimiento"
                    locale="es"
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    className={`form-control ${errors.birthdate ? 'is-invalid' : ''}`}                   
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.birthdate}
                  </Form.Control.Feedback>
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
                      isInvalid={!!errors.gender}
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
                      isInvalid={!!errors.gender}
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
                      isInvalid={!!errors.gender}
                      inline
                    />
                  </div>
                  {errors.gender && (
                    <Form.Control.Feedback type="invalid">
                      {errors.gender}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={
                    !fullName.trim() ||
                    !password.trim() ||
                    !email.trim() ||
                    !phone.trim() ||
                    !instagram.trim() ||
                    !birthdate ||
                    !gender.trim()
                  }
                  className="w-100"
                >
                  Continuar
                </Button>

                <br></br>
                <br></br>
                <ReCAPTCHA
                    sitekey='6LdK5HoqAAAAAK4U_6jYKSs7aSWp_RZTPhKZiNpM'
                    onChange={(e) => onChange(e, "captchaToken")}
                />

                {error && <div className="error">{error}</div>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
