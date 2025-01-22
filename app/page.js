"use client"

import Head from "next/head";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from '../components/Navbar.js';
import Banner from "@/components/Banner.js";
import Footer from "@/components/Footer.js";
import Main from "@/components/Main.js";
import CallToActionRegister from "@/components/CallToActionRegister.js";
import { useState, useEffect } from 'react';
import MisSesiones from "@/components/MisSesiones.js";
import MisReservas from "@/components/MisReservas.js";


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    // Solicita al backend que valide el token
    fetch('/api/utils/validate-token', {
      method: 'GET',
      credentials: 'include', // Incluye cookies en la solicitud
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Respuesta de validación:', data); // Debug
        setIsLoggedIn(data.isLoggedIn);
        setUser(data.user);
      })
      .catch((error) => {
        console.error('Error al validar el token:', error);
      });
  }, []);

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
          {/* Pasamos el estado al Navbar para personalizar los enlaces */}
          <Navbar isLoggedIn={isLoggedIn}/>
          <Banner isLoggedIn={isLoggedIn} user={user} />
          {/* Mostrar componentes condicionales */}
          {isLoggedIn ? (
            <div>
              <MisSesiones user={user}/>
              <MisReservas user={user}/>
              <Main isLoggedIn={isLoggedIn} />
            </div>
          ) : (
            <div>
              <Main />
              <CallToActionRegister />
            </div>
            
          )}
          <Footer />
        </div>
      </div>
    </>
  );
}
