// components/NotificationForm.js
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Slide } from "react-toastify";

function EditNotification({
  title,
  message,
  selectedNotificationOption,
  notifications,
  onChange,
  onSubmit,
  onBlur,
  error,
  errors,
  successMessage,
}) {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={8}>
          <Card>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <h4 align='center' style={{ color: '#4e4e4e' }}>Personalización de notificaciones automaticas</h4>
                <br></br>

                <Form.Group
                  className="form-floating mb-3"
                  controlId="formBasicEmailToOption"
                >
                <div className="notification-selection">
                  <label htmlFor="selectedNotificationOption">Tipo de notificación:</label>
                  <select id="selectedNotificationOption" value={selectedNotificationOption} onChange={(e) => onChange(e, "selectedNotificationOption")}>
                    <option value="">-- Selecciona una opción --</option>
                    {
                        notifications.map(
                            notification => <option key={notification.AutomatedNotificationID} value={notification.AutomatedNotificationID}>{notification.AutomatedNotificationName}</option>
                        )
                    }
                  </select>
                </div>
                </Form.Group>

                <Form.Group
                  className="form-floating mb-3"
                  controlId="formBasicTitle"
                >
                  <Form.Control
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => onChange(e, "title")}
                    onBlur={() => onBlur("title")}
                    isInvalid={!!errors.title}
                  />
                  <Form.Label>Título</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="form-floating mb-3">
                <textarea
                    type="text"
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    placeholder="Mensaje"
                    value={message}
                    onChange={(e) => onChange(e, 'message')}
                    onBlur={() => onBlur('message')}
                    style={{
                    backgroundColor: '#F9F9F9',
                    borderColor: '#D6D6D6',
                    borderRadius: '8px',
                    height: '240px',
                    }}
                />
                <label>Mensaje</label>
                {errors.message && (
                    <div className="invalid-feedback d-block">
                    {errors.message}
                    </div>
                )}
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={
                    !title ||
                    !message.trim()
                  }
                  className="w-100"
                >
                  Editar
                </Button>

                <br></br>
                <br></br>
                {error && <div className="invalid-feedback d-block">{error}</div>}
                {successMessage && <div className="valid-feedback d-block">{successMessage}</div>}
                <br></br>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer theme="dark" transition={Slide} position="bottom-center" />
    </Container >
  );
}

export default EditNotification;