// pages/dashboard.js
'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import styles from '../../styles/dashboard.module.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import dynamic from 'next/dynamic';

import { Chart as ChartJS, LineElement, PointElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, ArcElement, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

ChartJS.register(LineElement, PointElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, ArcElement, Legend);

const Chart = dynamic(() => import('react-chartjs-2').then((mod) => mod.Chart), {
    ssr: false,
});

const Dashboard = () => {

    const [bookings, setBookings] = useState([]);
    const [bookingsToday, setBookingsToday] = useState([]);
    const [bookingsWeek, setBookingsWeek] = useState([]);
    const [bookingsMonth, setBookingsMonth] = useState([]);
    const [pendingBookings, setPendingBookings] = useState([]);
    const [completedBookings , setCompletedBookings ] = useState([]);
    const [pendingBookingsMonth, setPendingBookingsMonth] = useState([]);
    const [completedBookingsMonth , setCompletedBookingsMonth ] = useState([]);
    const [cancelledBookingsMonth, setCancelledBookingsMonth] = useState([]);
    const [noShowBookingsMonth, setNoShowBookingsMonth] = useState([]);
    const [clients, setClients] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [services, setServices] = useState([]); 
    const [totalSales, setTotalSales] = useState();
    const [totalSalesCurrentMonth, setTotalSalesCurrentMonth] = useState([]);
    const [percentSales, setPercentSales] = useState();
    
    const fetchBookings = async () => {
        try {
          const response = await fetch('/api/getBookingsList');

          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
          }
          const dataBookings = await response.json();
          setBookings(dataBookings);
          setPendingBookings(dataBookings.filter((b) => b.BookingState == "Pendiente"));
          setCompletedBookings(dataBookings.filter((b) => b.BookingState == "Finalizada"));

          const today = new Date();
          const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0).toISOString().split("T")[0]; // 00:00:00.000

          // Filtra las reservas del dia
          setBookingsToday(
            dataBookings.filter((b) => {
              const bookingDate = new Date(b.BookingDate).toISOString().split("T")[0];
              return bookingDate == todayDate && b.BookingState == "Pendiente";
            })
          );

          const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }); // Lunes como inicio de la semana
          const endOfCurrentWeek = endOfWeek(today, { weekStartsOn: 1 }); // Domingo como fin de la semana

          setBookingsWeek(
            dataBookings.filter((b) => {
              const updatedDate = b.BookingDate.replace('Z', '');
              const bookingDate = new Date(updatedDate); // Convertir BookingDate a Date
              return isWithinInterval(bookingDate, {
                start: startOfCurrentWeek,
                end: endOfCurrentWeek,
              }) && b.BookingState != "Cancelada" && b.BookingState != "No show";
            })
          );
          
          setBookingsMonth(
            dataBookings.filter((b) => {
              const bookingDate = new Date(b.BookingDate); // Convertir a objeto Date
              return bookingDate.getMonth() === today.getMonth() && bookingDate.getFullYear() == today.getFullYear() && b.BookingState != "Cancelada" && b.BookingState != "No show";
            })
          );
          
          setCancelledBookingsMonth(
            dataBookings.filter((b) => {
              const bookingDate = new Date(b.BookingDate); // Convertir a objeto Date
              return bookingDate.getMonth() === today.getMonth() && bookingDate.getFullYear() == today.getFullYear() && b.BookingState == "Cancelada";
            })
          );

          setNoShowBookingsMonth(
            dataBookings.filter((b) => {
              const bookingDate = new Date(b.BookingDate); // Convertir a objeto Date
              return bookingDate.getMonth() === today.getMonth() && bookingDate.getFullYear() == today.getFullYear() && b.BookingState == "No show";
            })
          );

        } catch (error) {
          console.error('Error al obtener reservas:', error);
        }
    };

    const fetchClients = async () => {
      try {
        const response = await fetch('/api/getClientsList');
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        const dataClients = await response.json();
        setClients(dataClients);
        } catch (error) {
            console.error('Error al obtener clientes:', error);
        }
    };

    const fetchSessions = async () => {
        try {
          const response = await fetch('/api/getSessionsList');
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
          }
          const dataSessions = await response.json();
          setSessions(dataSessions);

          //Ventas mes actual respecto a mes anterior
          const now = new Date();
          const currentMonth = now.getMonth(); // Mes actual (0-11)
          const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Mes anterior
          const currentYear = now.getFullYear();
          const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
          
          const salesCurrentMonth = dataSessions.filter((session) => {
            const updatedDate = session.SessionPurchaseDate.replace('Z', '');
            const date = new Date(updatedDate);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
          });
          
          const salesPreviousMonth = dataSessions.filter((session) => {
            const updatedDate = session.SessionPurchaseDate.replace('Z', '');
            const date = new Date(updatedDate);
            return date.getMonth() === previousMonth && date.getFullYear() === previousMonthYear;
          });

          setTotalSalesCurrentMonth(salesCurrentMonth);

          const totalSalesCurrentMonth = salesCurrentMonth.reduce((total, session) => total + session.Price, 0);
          setTotalSales(totalSalesCurrentMonth.toLocaleString("es-ES"));
          const totalSalesPreviousMonth = salesPreviousMonth.reduce((total, session) => total + session.Price, 0);

          const changePercentage = salesPreviousMonth.length > 0 ? ((totalSalesCurrentMonth - totalSalesPreviousMonth) / totalSalesPreviousMonth) * 100 : 0; // Si el mes anterior no tiene ventas, evita dividir por cero

          const percentSalesFormat = changePercentage.toFixed(2) + "%";
          const percentSalesFormatSign = (changePercentage.toFixed(2) > 0) ? "+" + percentSalesFormat : percentSalesFormat;

          setPercentSales(percentSalesFormatSign);

        } catch (error) {
          console.error('Error al obtener reservas:', error);
        }
    };

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

    useEffect(() => {
      fetchBookings();
      fetchClients();
      fetchSessions();
      fetchServices();
    }, []);

    useEffect(() => {
      setPendingBookingsMonth(bookingsMonth.filter((b) => b.BookingState == "Pendiente"));
      setCompletedBookingsMonth(bookingsMonth.filter((b) => b.BookingState == "Finalizada"));
    }, [bookingsMonth]);

    //Ventas menusales 2024

    const salesCategories = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];

    const salesCounts = salesCategories.map((category, index) => {
        const count = sessions.filter((session) => {
          const updatedDate = session.SessionPurchaseDate.replace('Z', '');
          const purchaseMonth = new Date(updatedDate).getMonth(); // Obtiene el mes (0 = Enero, 11 = Diciembre)
          return purchaseMonth === index; // Compara con el índice del mes
        }).length;
        return { SessionName: category, count };
      });

    const salesData = {
        labels: salesCategories,
        datasets: [
            {
                label: 'Ventas',
                data: salesCounts.map((item) => item.count),
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                tension: 0.4,
            },
        ],
    };

    const salesOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Ventas mensuales 2024',
                font: {
                    size: 15,
                    weight: 'bold',
                },
                color: '#333',
                padding: { top: 10, bottom: 30 },
            },
        },
        responsive: true,
    };

    //Horarios solicitados

    const hours = Array.from({ length: 14 }, (_, i) => `${8 + i}:00`);

    const validBookings = bookings.filter((booking) => booking.BookingState == "Finalizada");

    const hourlyCounts = hours.map((hour) => {
      const count = validBookings.filter((booking) => {
        const updatedDate = booking.BookingTime.replace('Z', '');
        const bookingDate = new Date(updatedDate);
        const bookingHour = bookingDate.getHours();
        return `${bookingHour}:00` === hour;
      }).length;
      return { hour, count };
    });

    const hoursData = {
        labels: hourlyCounts.map((item) => item.hour),
        datasets: [
            {
                label: 'Reservas por hora',
                data: hourlyCounts.map((item) => item.count),
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                tension: 0.4,
            },
        ],
    };

    const hoursOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Horarios solicitados',
                font: {
                    size: 15,
                    weight: 'bold',
                },
                color: '#333',
                padding: { top: 10, bottom: 30 },
            },
        },
        responsive: true,
    };

    //Genero

    const genderCategories = ["femenino", "masculino", "otro"];

    const genderCounts = genderCategories.map((category) => {
        const count = clients.filter((client) => client.Gender === category).length;
        return { gender: category, count };
      });

    const dataPieGen = {
        labels: genderCounts.map((item) => item.gender),
        datasets: [
            {
                label: "Cantidad de Clientes",
                data: genderCounts.map((item) => item.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],

    }

    //Reservas completadas vs canceladas

    const bookingsConfPend = completedBookings.length + pendingBookings.length;
    
    let bookingsConfPercent = 0;
    let bookingsPendPercent = 0;

    if (bookingsConfPend > 0) {
        bookingsConfPercent = (completedBookings.length * 100) / bookingsConfPend;
        bookingsPendPercent = 100 - bookingsConfPercent;
    }

    const dataPieBookings = {
        labels: ["Reservas pendientes", "Reservas finalizadas"],
        datasets: [
            {
                label: ["Reservas"],
                data: [bookingsPendPercent, bookingsConfPercent],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],

    }

    //Demanda de servicios

    const serviceCategories = ["Bronceado Orgánico - Sesión Individual", "Bronceado Orgánico - Cuponera (2 sesiones)", "Bronceado Orgánico - Cuponera (4 sesiones)", "Bronceado Orgánico - Cuponera (6 sesiones)"];

    // Crea un mapa para contar las sesiones por tipo de servicio
    const serviceCounts = services.map(service => {
      // Cuenta las sesiones que corresponden a cada servicio
      const count = sessions.filter(session => session.ServiceID === service.ServiceID).length;
      return { ServiceName: service.ServiceName, count };
    });

    const serviceData = {
        labels: serviceCategories,
        datasets: [
          {
            label: 'Bronceado orgánico',
            data: serviceCounts.map((item) => item.count),
            backgroundColor: 'rgba(75,192,192,0.5)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      };
      
      const serviceOptions = {
        indexAxis: 'y', // Cambia la orientación a horizontal
        plugins: {
          title: {
            display: true,
            text: 'Demanda de Servicios',
          },
        },
        responsive: true,
        scales: {
          x: {
            beginAtZero: true, // Las barras comienzan en 0
          },
        },
      };

      //Rangos etarios

      const ageRanges = [
        { label: "18 a 25", min: 18, max: 25 },
        { label: "26 a 35", min: 26, max: 35 },
        { label: "36 a 45", min: 36, max: 45 },
        { label: "46 a 55", min: 46, max: 55 },
        { label: "56 a 65", min: 56, max: 65 },        
        { label: "66+", min: 66, max: Infinity },
      ];

      const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const hasBirthdayPassed =
          today.getMonth() > birthDate.getMonth() || 
          (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
        if (!hasBirthdayPassed) {
          age--;
        }
        return age;
      };

      const ageRangeCounts = ageRanges.map((range) => {
        const count = clients.filter(
          (client) => { const age = calculateAge(client.Birthdate);
                        return age >= range.min && age <= range.max }
        ).length;
        return { range: range.label, count };
      });

      const ageData = {
        labels: ageRangeCounts.map((item) => item.range),
        datasets: [
          {
            label: 'Cantidad de Clientes',
            data: ageRangeCounts.map((item) => item.count),
            backgroundColor: 'rgba(75,192,192,0.5)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      };
      
      const ageOptions = {
        indexAxis: 'y', // Cambia la orientación a horizontal
        plugins: {
          title: {
            display: true,
            text: 'Rangos etarios',
          },
        },
        responsive: true,
        scales: {
          x: {
            beginAtZero: true, // Las barras comienzan en 0
          },
        },
      };

    return (
        <>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,300italic,400italic" />
          <title>Dashboard</title>
        </Head>
            <header
                className="py-3"
                style={{ backgroundColor: '#795D4F', color: '#FFF' }}
            >
              <div className="container d-flex justify-content-between">
                <a href="/homeAdmin" className="text-white text-decoration-none">
                  Volver
                </a>
            </div>
            </header>
        <div
            className="d-flex flex-column min-vh-100"
            style={{ backgroundColor: '#F5EDE8', padding: '50px' }}
        >

            <Container>
                <Card  >
                    <Card.Body>
                        <Row className='justify-content-center'>
                            <Col xs={12}>
                                <p className={styles.title}>Dashboard</p>
                                <div className={styles.top}>
                                    <div className={styles.card}><p className={styles.cardTitle}>Reservas para hoy</p><p className={styles.cardNumber}>{bookingsToday.length}</p></div>  {/* 5*/}
                                    <div className={styles.card}><p className={styles.cardTitle}>Reservas esta semana</p><p className={styles.cardNumber}>{bookingsWeek.length}</p></div>  {/* 35*/}
                                    <div className={styles.card}><p className={styles.cardTitle}>Reservas del mes</p><p className={styles.cardNumber}>{bookingsMonth.length}</p></div>  {/* 80*/}
                                    <div className={styles.card}><p className={styles.cardTitle}>Clientes registrados</p><p className={styles.cardNumber}>{clients.length}</p></div>  {/* 75*/}
                                    <div className={styles.card}><p className={styles.cardTitle}>Ingresos</p><p className={styles.cardNumber}>$ {totalSales}</p><div className={styles.percentageWrapper}><p className={styles.numberPercent}>{percentSales} </p><p className={styles.textPercent}>respecto al ultimo mes</p></div></div>  {/* $125.000*/}
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className={styles.top}>
                                    <div className={styles.card}><p className={styles.cardTitle}>Reservas pendientes</p><p className={styles.cardNumber}>{pendingBookingsMonth.length}</p><p className={styles.textPercent}>mes actual</p></div>  {/* 30*/}
                                    <div className={styles.card}><p className={styles.cardTitle}>Reservas finalizadas</p><p className={styles.cardNumber}>{completedBookingsMonth.length}</p><p className={styles.textPercent}>mes actual</p></div>  {/* 75*/}
                                    <div className={styles.card}><p className={styles.cardTitle}>Reservas canceladas</p><p className={styles.cardNumber}>{cancelledBookingsMonth.length}</p><p className={styles.textPercent}>mes actual</p></div>  {/* 10*/}
                                    <div className={styles.card}><p className={styles.cardTitle}>Reservas con ausencia</p><p className={styles.cardNumber}>{noShowBookingsMonth.length}</p><p className={styles.textPercent}>mes actual</p></div>  {/* 5*/}
                                    <div className={styles.card}><p className={styles.cardTitle}>Cantidad de ventas</p><p className={styles.cardNumber}>{totalSalesCurrentMonth.length}</p><p className={styles.textPercent}>mes actual</p></div>  {/* 152*/}
                                </div>
                            </Col>
                        </Row >
                    </Card.Body>
                    <br></br>
                    <Card.Body>
                        <Row className="justify-content-center">
                            <Col xs={6}>
                                <div className={`${styles.card} ${styles.chartContainer}`}>
                                <Chart type="bar" data={salesData} options={salesOptions} />
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className={`${styles.card} ${styles.chartContainer}`}>
                                <Chart type="line" data={hoursData} options={hoursOptions} />
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <br></br>
                    <Card.Body>
                        <Row className='justify-content-center'>
                            <Col xs={3}>
                                <div className={styles.card}>
                                    <div className={styles.bottom}>
                                        <Pie data={dataPieGen} />
                                    </div>
                                </div>
                                <br></br>
                            </Col>
                            <Col xs={9}>
                                <div className={styles.card}>
                                    <div style={{ width: '600px', margin: '0 auto' }}>
                                        <Bar data={ageData} options={ageOptions} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <br></br>
                    <Card.Body>
                        <Row className='justify-content-center'>
                            <Col xs={3}>
                                <div className={styles.card}>
                                    <div className={styles.bottom}>
                                        <Pie data={dataPieBookings} />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={9}>
                                <div className={styles.card}>
                                    <div style={{ width: '600px', margin: '0 auto' }}>
                                        <Bar data={serviceData} options={serviceOptions} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    
                </Card>
            </Container >
        </div>
        <Footer />
        </>
    );
};

export default Dashboard;