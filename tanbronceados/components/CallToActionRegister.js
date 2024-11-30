'use client';

import { useRouter } from 'next/navigation';

const CallToActionRegister = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.push('/register'); // Redirige a la página "/registro"
  };

  return (
    <section id="cta">
      <h2>Regístrate para reservar tu bronceado</h2>
      <form>
        <div className="row gtr-50 gtr-uniform" style={{ justifyContent: 'center' }}>
          <div className="col-4 col-12-mobilep" style={{ textAlign: 'center' }}>
            <input 
              type="button" 
              value="Registrate" 
              className="fit" 
              onClick={handleRegister} 
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default CallToActionRegister;
