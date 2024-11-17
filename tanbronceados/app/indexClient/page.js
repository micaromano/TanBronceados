import Navbar from '../../components/Navbar.js';
import React from 'react';
import styles from '../../styles/IndexClient.module.css' 
import 'bootstrap/dist/css/bootstrap.min.css';


export default function HomeClient() {
  return (
    <div>
      <Navbar />
      <header className={`${styles.header} d-flex align-items-center`}>
        <div className={"container-fluid"}>
        <div className="row align-items-center">
            {/* Sección Izquierda: Imagen */}
            <div className="col-md-6 text-center">
              <img
                src="/images/portadaTanparaGirar.jpg"
                alt="Foto de presentación"
                className={`${styles.headerImage} img-fluid`}
              />
            </div>

            {/* Sección Derecha: Logo y Botón */}
            <div className="col-md-6 text-center text-md-end">
              <img
                src="/images/logoBlanco.jpg"
                alt="Logo"
                className="img-fluid w-25"
              />
              {/*<p className={`${styles.coverSubtitle} lead`}>Tu lugar de bronceados orgánicos</p>*/}
              <a href="/loginClient" className="btn btn-primary btn-lg mt-3">Obtener sesiones</a>
            </div>
          </div>
        </div>
      </header>

      <main className={`container py-5 ${styles.main}`}>
        {/* Sección Nosotras */}
        <section id="nosotras" className={`${styles.section} mb-5`}>
          <h2 className={`${styles.sectionH2} h1 mb-4`}>Sobre Nosotras</h2>
          <p className={`${styles.sectionP} lead`}>
          Realizamos bronceado con aerógrafo, el cual te permite disfrutar de un bronceado de verano todo el año, evitando exponer a tu piel a rayos UV.
          </p>
          <p className={`${styles.sectionP} lead`}>
          El tono depende de cada tipo de piel, eso es lo que hace que el color quede natural, y no naranja.
          </p>
        </section>

        {/* Sección Servicios */}
        <section id="servicios" className={`${styles.section} mb-5`}>
          <h2 className={`${styles.sectionH2} h1 mb-4`}>Servicios</h2>
          <p className={`${styles.sectionP} lead`}>
          Nuestro servicio y productos son 100% orgánicos, libres de crueldad animal, aptos para la piel aprobados por PETA y no contienen glúten. 
          </p>
          <p className={`${styles.sectionP} lead`}>
          No tiene ningún tipo de contraindicaciones, tanto así que mujeres embarazadas y en período de lactancia lo utilizan.
          </p>
          <p className={`${styles.sectionP} lead`}>
          Con solo una sesión de 15 minutos, podrás tener un mega bronceado, el cual permanecerá en tu piel entre 5 y 10 días aproximadamente.
          </p>
        </section>

        {/* Sección Contacto */}
        <section id="contacto" className={`${styles.section} mb-5`}>
          <h2 className={`${styles.sectionH2} h1 mb-4`}>Contacto</h2>
          <p className={`${styles.sectionP} lead`}>¡Estamos aquí para ayudarte! Contáctanos para consultas</p>
          <address className={`${styles.address}`}>
            <p className={`${styles.addressP} lead`}><strong>Email: </strong> tan.bronceadoorganico@gmail.com </p>
            <p className={`${styles.addressP} lead`}><strong>Teléfono: </strong>092900303</p>
          </address>
        </section>
      </main>
    </div>
  );
}


