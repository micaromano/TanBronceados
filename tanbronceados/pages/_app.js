// En _app.js
require('bootstrap/dist/css/bootstrap.min.css');
require('../styles/globals.css'); // Asegúrate de que este archivo existe o elimina la línea si no lo usas.

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;


