import React, { useState, useEffect } from 'react';

const Main = ({isLoggedIn}) => {
    const [services, setServices] = useState([]);
    
    useEffect(()=> {  
      const fetchServices = async () => {
        try {
          const response = await fetch('/api/getServicesList');
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
          }
          const dataServices = await response.json();
          setServices(dataServices);
        } catch (error) {
          console.error('Error al obtener servicios:', error);
        }
      };
  
      fetchServices();
    }, []);

    return (
        <>
            <div id="nosotras">
            <section id="main" className="container">
              <section className="box special">
                <header className="major">
                  <h2>Sobre Nosotras</h2>
                  <p>Realizamos bronceado con aerógrafo, el cual te permite disfrutar de un bronceado de verano todo el año, evitando exponer a tu piel a rayos UV.</p>
                  <p>El tono depende de cada tipo de piel, eso es lo que hace que el color quede natural, y no naranja.</p>
                </header>
                <span className="image featured"><img src="/images/tanNosotras.png" alt="" /></span>
              </section>
            </section>
          </div>

          <div id="servicios" className="container">
            <section className="box special features">
              <div className="features-row">
              {services.map((service) => (
                  <section key={service.ServiceID}>
                    <span className="icon solid major fa-bolt accent2"></span>
                    <h3>{service.ServiceName}</h3>
                    <p>{service.ServiceDescription}</p>
                    <li><a href={isLoggedIn ? `/comprar` : '/login'} className="button primary">Comprar</a></li>
                  </section>
              ))}    
              </div>
            </section>
          </div>

          <div id="contacto" className="container">
            <div className="col-12 col-12-narrower">
              <section className="box special">
                <h3>Contacto</h3>
                <p>¡Estamos aquí para ayudarte! Contáctanos para consultas</p>
                <p>Teléfono 092900303</p>
              </section>
            </div>
          </div>      
        </>
        
    )
}

export default Main;