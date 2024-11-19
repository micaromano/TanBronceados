import Head from "next/head";

export default function Home() {
  return (
    <>
      <div className="landing is-preload">
        <Head>
          <title>TAN Bronceados</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <link rel="stylesheet" href="/styles/Home.css" />
          <link rel="stylesheet" href="/assets/css/fontawesome-all.min.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,300italic,400italic" />
        </Head>
        <div id="page-wrapper">
          {/* Header */}
          <header id="header" className="alt" style={{ backgroundColor: '#795D4F'}}>
            <h1><a href="/">TAN Bronceados</a></h1>
            <nav id="nav">
              <ul>
                <li><a href="#nosotras">Nosotras</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#contacto">Contacto</a></li>
                <li><a href="/register">Registrarse</a></li>
                <li><a href="/loginAdmin">Acceso Admin</a></li>
                <li><a href="/login" className="button">Login</a></li>
              </ul>
            </nav>
          </header>

          {/* Banner */}
          <section id="banner" className="banner">
            <h2>TAN Bronceados</h2>
            <p>Bronceado Orgánico</p>
            <ul className="actions special">
              <li><a href="/register" className="button primary">Registrarse</a></li>
              <li><a href="/login" className="button">Obtener Sesiones</a></li>
            </ul>
          </section>

          {/* Main */}
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

          {/* CTA */}
          <section id="cta">
            <h2>Regístrate para reservar tu bronceado</h2>
            <form>
              <div className="row gtr-50 gtr-uniform" style={{ justifyContent: 'center' }}>
                <div className="col-4 col-12-mobilep" style={{ textAlign: 'center' }}>
                  <input type="button" value="Registrate" className="fit" />
                </div>
              </div>
            </form>
          </section>

          {/* Footer */}
          <footer id="footer">
            <ul className="icons">
              <li><a href="#" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
              <li><a href="#" className="icon brands fa-google-plus"><span className="label">Google+</span></a></li>
            </ul>
            <ul className="copyright">
              <li>&copy; Tan Bronceados. All rights reserved.</li>
            </ul>
          </footer>
        </div>
      </div>
    </>
  );
}
