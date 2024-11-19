import Navbar from '../../components/Navbar.js';
import React from 'react';
import { Image, Container, Row, Col, Button } from 'react-bootstrap';
import styles from '../../styles/IndexClient.module.css';

export default function HomeClient() {
  return (
    <Container fluid className="p-0">
      <Navbar />

      {/* Header */}
      <Container fluid className={`${styles.header} text-center text-md-start py-5`}>
        <Row className="px-3 px-md-5 align-items-center">
          <Col className={`${styles.coverText}`} xs={12} md={6}>
            <h1 className={`${styles.coverTitle} display-1`}>tan.</h1>
            <h2 className={`${styles.coverSubtitle} lead`}>Bronceado orgánico</h2>
            <Button href="#comprar" variant="primary" size="lg" className={styles.btnComprar}>
              Obtener Sesiones
            </Button>
          </Col>
        </Row>
      </Container>
    

      <Container fluid className="py-5 font-family-base">
          {/* Sección Nosotras */}
          <Container id={`${styles.nosotras}`} className={`${styles.section}`}>
            <Row className={`${styles.sectionRow}`}>
              <Col>
                <h2 className="h1 mb-4">Sobre Nosotras</h2>
                <p className="lead">
                  Realizamos bronceado con aerógrafo, el cual te permite disfrutar de un bronceado
                  de verano todo el año, evitando exponer a tu piel a rayos UV.
                </p>
                <p className="lead">
                  El tono depende de cada tipo de piel, eso es lo que hace que el color quede
                  natural, y no naranja.
                </p>
              </Col>
            </Row>
          </Container>

          {/* Sección Servicios */}
          <Container id={`${styles.servicios}`} className={`${styles.section}`} >
            <Row className={`${styles.sectionRow}`}>
             <Col style={{ display: "flex" }}>
                <Image fluid 
                  src='/images/copiaPruebaRecorte.jpg' 
                  style={{ width: "auto", height: "600px", paddingRight: "40px" }}
                />
              </Col>
              <Col>
                <h2 className="h1 mb-4">Servicios</h2>
                <p className="lead">
                  Nuestro servicio y productos son 100% orgánicos, libres de crueldad animal,
                  aptos para la piel aprobados por PETA y no contienen gluten.
                </p>
                <p className="lead">
                  No tiene ningún tipo de contraindicaciones, tanto así que mujeres embarazadas y
                  en período de lactancia lo utilizan.
                </p>
                <p className="lead">
                  Con solo una sesión de 15 minutos, podrás tener un mega bronceado, el cual
                  permanecerá en tu piel entre 5 y 10 días aproximadamente.
                </p>
              </Col>
            </Row>
          </Container>

          {/* Sección Contacto */}
          <Container id={`${styles.contacto}`} className={`${styles.section}`}>
            <Row className={`${styles.sectionRow}`}>
              <Col>
                <h2 className="h1 mb-4">Contacto</h2>
                <p className="lead">¡Estamos aquí para ayudarte! Contáctanos para consultas</p>
                <address>
                  <p className="lead">
                    <strong>Email: </strong>tan.bronceadoorganico@gmail.com
                  </p>
                  <p className="lead">
                    <strong>Teléfono: </strong>092900303
                  </p>
                </address>
              </Col>
            </Row>
          </Container>
        </Container>

      <Container fluid as="footer" className="bg-light py-4">
          <Row className="justify-content-center">
            <Col xs="auto" className="text-center">
              <a href="https://www.instagram.com/tan.bronceado/?hl=es" target="_blank">
                <Image
                  src="/images/instagram.png"
                  alt="Logo de Instagram"
                  title="Link a Instagram"
                  style={{ width: "50px", height: "auto" }}
                  fluid
                />
              </a>
            </Col>
          </Row>  
      </Container>
    </Container>

    
  );
}
