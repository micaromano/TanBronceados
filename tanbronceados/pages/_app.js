// En _app.js
import { SessionProvider } from 'next-auth/react';
require('bootstrap/dist/css/bootstrap.min.css');
require('../styles/globals.css'); 
//require('./index');


function MyApp({ Component, pageProps }) {
  console.log('PageProps Session:', pageProps.session);
  
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;


