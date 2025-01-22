// components/NotificationForm.js
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Slide } from "react-toastify";

function NotificationForm({
  from,
  title,
  message,
  isScheduled,
  scheduledDate,
  selectedClientOption,
  isClientOne,
  selectedClients,
  filteredClients,
  searchTerm,
  onChange,
  onSubmit,
  onBlur,
  onSelected,
  error,
  errors,
  successMessage,
  onTest,
}) {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={8}>
          <Card>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <h4 align='center' style={{ color: '#4e4e4e' }}>Gestion de notificaciones</h4>
                <br></br>

                <Form.Group
                  className="form-floating mb-3"
                  controlId="formBasicEmailToOption"
                >
                <div className="service-selection">
                  <label htmlFor="selectedClientOption">Tipo de destinatarios:</label>
                  <select id="selectedClientOption" value={selectedClientOption} onChange={(e) => onChange(e, "selectedClientOption")}>
                    <option key={""} value="">-- Selecciona una opción --</option>
                    <option key="allClients" value="allClients">Todos los clientes</option>
                    <option key="oneClient" value="oneClient">Lista personalizada</option>
                  </select>
                </div>
                </Form.Group>

                  {isClientOne && (
                    <>

                <Form.Group
                  className="form-floating mb-3"
                  controlId="formBasicEmailTo"
                  >
                    {/* Buscador */}
                      <Form.Control
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={(e) => onChange(e, "searchTerm")}
                      />
                  </Form.Group>
                     
                     {/* Tabla de clientes */}
                    <Container>
                        <Row className="justify-content-center">
                        <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ccc" }}>
                            <Table striped bordered hover responsive className="table-sm">
                            <thead>
                              <tr>
                                <th>Seleccionar</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredClients.length > 0 ? (
                                filteredClients.map((client) => (
                                  <tr key={client.ClientID}>
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked={selectedClients.some((c) => c.ClientID === client.ClientID)}
                                        onChange={() => onSelected(client)}
                                      />
                                    </td>
                                    <td>{client.FullName}</td>
                                    <td>{client.Email}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="3" style={{ textAlign: 'center' }}>
                                    No se encontraron clientes.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                            </Table>
                            </div>
                        </Row>
                    </Container>
                    <br></br>
                    <h6>Destinatarios seleccionados:</h6>
                    <ul>
                      {selectedClients.map((client) => (
                        <li key={client.ClientID}>{client.FullName} ({client.Email})</li>
                      ))}
                    </ul>
                  </>
                )}
                
                <Form.Group
                  className="mb-3"
                  controlId="formBasicScheduled"
                >
                <div className="service-selection">
                <label htmlFor="scheduled">
                Programar envío:
                </label>
                <input id="scheduled" type="checkbox" checked={isScheduled} onChange={(e) => onChange(e, "isScheduled")} />
                {isScheduled && (
                  <>
                  <br></br>
                  <input type="datetime-local" value={scheduledDate} onChange={(e) => onChange(e, "scheduledDate")} />
                  <br></br>
                  </>
                )}
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
                    !from.trim() ||
                    !title ||
                    !message.trim()
                  }
                  className="w-100"
                >
                  Enviar
                </Button>
                
                <br></br>

                <Button
                  variant="secondary"
                  className="w-100"
                  onClick={() => onTest()}
                >
                  Prueba
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

export default NotificationForm;