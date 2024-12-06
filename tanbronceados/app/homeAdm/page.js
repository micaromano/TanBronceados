"use client";

import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";

export default function AdminHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Validar token para verificar inicio de sesión
    fetch("/api/utils/validate-token", {
      method: "GET",
      credentials: "include", // Incluye cookies
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn);
      })
      .catch((error) => {
        console.error("Error al validar el token:", error);
      });
  }, []);

  const cards = [
    { title: "Profesionales", icon: "/prueba.png" },
    { title: "Servicios", icon: "/prueba.png" },
    { title: "Horarios", icon: "/prueba.png" },
    { title: "Calendario", icon: "/prueba.png" },
  ];

  return (
    <>
      <div className="admin-home">
        <Head>
          <title>Admin Home - TAN Bronceados</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          {/* Bootstrap CSS */}
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
            rel="stylesheet"
          />
        </Head>
        <div id="page-wrapper">
          {/* Navbar */}
          <Navbar isLoggedIn={isLoggedIn} />
          {/* Contenido principal */}
          <div className="container py-5">
            <h1 className="text-center mb-4">Panel de Administración</h1>
            <div className="row g-4">
              {cards.map((card, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <div className="card text-center shadow-sm">
                    <div className="card-body">
                      <img
                        src={card.icon}
                        alt={card.title}
                        className="img-fluid mb-3"
                        style={{ maxWidth: "100px" }}
                      />
                      <h5 className="card-title">{card.title}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>
  );
}
