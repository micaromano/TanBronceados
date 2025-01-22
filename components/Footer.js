import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-auto py-3" style={{ backgroundColor: '#f8f9fa', textAlign: 'center' }}>
            <ul className="icons" style={{ marginBottom: '0.3rem', marginTop: '1rem' }}>
                <li><a href="https://www.instagram.com/tan.bronceado?igsh=MXFmb3JleDhwYzVyYw==" style={{ textDecoration: 'none', color: 'inherit', outline: 'none', border: 'none' }} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram me-2" style={{ fontSize: '1.4rem' }}></i><span className="label"></span></a></li>
                    {/* TODO: Poner link de whatsapp */}
                <li><a href="#" style={{ textDecoration: 'none', color: 'inherit', outline: 'none',  border: 'none' }}><i className="fab fa-whatsapp me-2" style={{ fontSize: '1.4rem' }}></i><span className="label"></span></a></li>
            </ul>
            <ul className="copyright">
                <li>&copy; Tan Bronceados. All rights reserved.</li>
            </ul>
        </footer>
    )
}

export default Footer;