// components/LoginForm.js
// Importaciones necesarias
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from "react-toastify";
import Head from 'next/head';
import styles from '../styles/login.module.css';
import Footer from './Footer';

function AdminLoginForm({ username, password, onChange, onSubmit, onBlur, error, errors }) {
    return (
        <>
            {/* Header */}
            <header id="header" className="alt" style={{ backgroundColor: '#795D4F'}}>
            <nav id="nav">
              <ul>
                <li><a href="/">Inicio</a></li>
              </ul>
            </nav>
          </header>
            <Head>
                <title>Administrador - log in</title>
            </Head>
            <div className={`${styles.container} d-flex flex-column min-vh-100`}>
                <div className="row flex-grow-1">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto mt-5">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Ingresar como Administrador</h5>
                                <form onSubmit={onSubmit}>
                                    <div className="form-floating mb-3">
                                        <input 
                                            type="text" 
                                            className={`form-control ${errors.username ? 'is-invalid' : ''}`} 
                                            id="floatingUsername" 
                                            placeholder="Usuario"
                                            value={username}
                                            onChange={e => onChange(e, 'username')}
                                            onBlur={() => onBlur('username')}
                                        />
                                        <label htmlFor="floatingUsername">Usuario</label>
                                        {errors.username && (
                                            <div className="invalid-feedback d-block">
                                                {errors.username}
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
                                            disabled={!username.trim() || !password.trim()}
                                        >
                                            Ingresar
                                        </button>
                                    </div>
                                    {error && <div className="text-danger mb-3 text-center mt-3">{error}</div>}
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

export default AdminLoginForm;
