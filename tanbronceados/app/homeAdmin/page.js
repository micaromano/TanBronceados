import React from 'react';

function AdminHome() {
  const cards = [
    { title: 'Profesionales', icon: '/prueba.png' },
    { title: 'Servicios', icon: '/prueba.png' },
    { title: 'Horarios', icon: '/prueba.png' },
    { title: 'Calendario', icon: '/prueba.png' },
  ];

  return (
    <div style={styles.container}>
      {cards.map((card, index) => (
        <div key={index} style={styles.card}>
          <h3>{card.title}</h3>
          <img src={card.icon} alt={card.title} style={styles.icon} />
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    padding: '20px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  icon: {
    width: '100px',
    height: 'auto',
    marginTop: '10px',
  },
};

export default AdminHome;
