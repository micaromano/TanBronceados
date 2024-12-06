import React from 'react';

const Main = () => {
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
                <section>
                  <span className="icon solid major fa-bolt accent2"></span>
                  <h3>Cuidado Orgánico Total</h3>
                  <p>Nuestro servicio y productos son 100% orgánicos, libres de crueldad animal, aptos para la piel, aprobados por PETA y no contienen gluten. No tienen contraindicaciones. Incluso mujeres embarazadas y en período de lactancia los utilizan sin problemas.</p>
                </section>
                <section>
                  <span className="icon solid major fa-chart-area accent3"></span>
                  <h3>Bronceado Exprés Duradero</h3>
                  <p>Con solo una sesión de 15 minutos, podrás tener un mega bronceado. Este bronceado permanecerá en tu piel entre 5 y 10 días aproximadamente</p>
                </section>
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