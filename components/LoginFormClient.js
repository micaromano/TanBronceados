// components/LoginForm.js
// Importaciones necesarias
import { signIn } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from "react-toastify";
import Head from 'next/head';
import styles from '../styles/login.module.css';
import Footer from './Footer';
import Main from './Main';

function LoginForm({ email, password, onChange, onSubmit, onBlur, error, errors }) {
    return (
        <>
            {/* Header */}
            <header id="header" className="alt" style={{ backgroundColor: '#795D4F'}}>
            <nav id="nav">
              <ul>
                <li><a href="/register">Registrarse</a></li>
                <li><a href="/">Inicio</a></li>
              </ul>
            </nav>
          </header>
            <Head>
                <title>log in</title>
            </Head>
            <div className={styles.container}>
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto mt-5">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Ingresar</h5>
                                <form onSubmit={onSubmit}>
                                    <div className="form-floating mb-3">
                                        <input 
                                            type="email" 
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                                            id="floatingInput" 
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={e => onChange(e, 'email')}
                                            onBlur={() => onBlur('email')}
                                        />
                                        <label htmlFor="floatingInput">Correo electronico</label>
                                        {errors.email && (
                                            <div className="invalid-feedback d-block">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input 
                                            type="password" 
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                                            id="floatingPassword" 
                                            placeholder="Password"
                                            value={password}
                                            onChange={e => onChange(e, 'password')}
                                            onBlur={() => onBlur('password')}
                                        />
                                        <label htmlFor="floatingPassword">Contraseña</label>
                                        {errors.password && (
                                            <div className="invalid-feedback d-block">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>
                                    <div className="d-grid">
                                        <button 
                                            className={`btn ${styles.btnLogin} text-uppercase fw-bold`} 
                                            type="submit"
                                            disabled={!email.trim() || !password.trim()}
                                        >
                                            Ingresar
                                        </button>
                                    </div>
                                    {error && <div className="text-danger mb-3 text-center mt-3">{error}</div>}
                                    <hr className="my-4" />
                                    <div className="d-grid mb-2">
                                        <button 
                                            className={`btn ${styles.btnGoogle} ${styles.btnLogin} text-uppercase fw-bold`} 
                                            type="button"
                                            onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/' })}
                                        >
                                            <i className="fab fa-google me-2"  style={{ fontSize: '1.4rem' }}></i> Ingrese con Google
                                        </button>
                                    </div>
                                    <div className="d-grid">
                                        <button 
                                            className={`btn ${styles.btnInstagram} ${styles.btnLogin} text-uppercase fw-bold`} 
                                            type="button"
                                            onClick={() => signIn('Instagram', { callbackUrl: 'http://localhost:3000/' })}
                                        >
                                            <i className="fab fa-instagram me-2"  style={{ fontSize: '1.7rem' }}></i> Ingrese con Instagram
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <ToastContainer position="bottom-center" />
            </div>
        </>
    );
}

export default LoginForm;
