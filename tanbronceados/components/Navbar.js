// components/Navbar.js
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => (
  <nav className={styles.nav}>
    <ul>
      <li><Link href="/">INICIO</Link></li>
      <li><Link href="#nosotras">NOSOTRAS</Link></li>
      <li><Link href="#servicios">SERVICIOS</Link></li>
      <li><Link href="#contacto">CONTACTO</Link></li>
      <li><Link href="/loginAdmin">ACCESO COMO ADMIN</Link></li>
      <li className={styles.loginLink}><Link href="/loginCliente">LOGIN</Link></li>
    </ul>
  </nav>
);

export default Navbar;
