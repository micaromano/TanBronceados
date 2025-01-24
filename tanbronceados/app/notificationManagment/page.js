'use client';

// pages/register.js
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NotificationForm from '../../components/NotificationForm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Head from 'next/head';
import Footer from '../../components/Footer';

function NotificationPage() {
  const [state, setState] = useState({
    from: 'martinquartino1313@gmail.com', //TODO: Cambiar a mail de usuario administrador activo
    to: '',
    title: '',
    message: '',
    isScheduled: false,
    scheduledDate: '',
    selectedClientOption: '',
    isClientOne: false,
    selectedClients: [],
    filteredClients: [],
    clients: [],
    searchTerm: '',
    error: '',
    errors: {},
    successMessage: ''
  });
  
  useEffect(() => {
    handleClients();
    //handleAdmin();
  }, []);

  const router = useRouter();

  const handleChange = (e, field) => {

    const value = field === 'isScheduled' ? e.target.checked : e.target.value;

    if (field === "selectedClientOption") {
      if (value === "allClients") {
        handleClients(); // Llama a la función para manejar clientes
      } else if (value === "oneClient") {
        setState({
          ...state,
          to: "",
          isClientOne: true,
          [field]: value,
        });
      }
    }

    if (field === "searchTerm") {
      const filteredClientsList = state.clients.filter((client) =>
        client.FullName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      
      setState({
        ...state,
        searchTerm: e.target.value, // Actualiza también el searchTerm
        filteredClients: filteredClientsList,
      });
    }
    
    if(value != "oneClient" && field != "searchTerm"){
      setState({
        ...state,
        [field]: value,
        errors: {
          ...state.errors,
          [field]: '' // Limpiar el error al cambiar el valor
        }
      });
    }
  };

  const handleBlur = (field) => {
    let errorMessage = '';

    // Validaciones específicas por campo
    switch (field) {

      case 'title':
        if (!state.title.trim()) {
          errorMessage = 'El asunto es obligatorio.';
        } else if (state.title.length < 3) {
          errorMessage = 'El asunto debe tener al menos 3 caracteres.';
        }
        break;

      case 'message':
        if (!state.message.trim()) {
          errorMessage = 'El mensaje es obligatorio.';
        } else if (state.message.length < 3) {
          errorMessage = 'El mensaje debe tener al menos 3 caracteres.';
        }
        break;

      default:
        break;
    }

    // Actualizar el estado solo si hay un mensaje de error
    setState((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [field]: errorMessage
      }
    }));
  };

  const clearMessages = () => {
    setState((prevState) => ({
      ...prevState,
      error: '',
      successMessage: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Se envía solicitud de registro con los datos del formulario
    try {
      console.log('state', state);
      const res = await fetch('/api/sendNotificationHandler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: state.from, to: state.to, title: state.title, message: state.message, isScheduled: state.isScheduled, scheduledDate: state.scheduledDate, bookingObject: null }),
      });

      if (res.ok) {
        const mess = await res.json();
        setState({ ...state, successMessage: mess.message });
        if(!state.isScheduled){
          await toast.success('¡Se envío la notificación exitosamente!');
        } else {
          await toast.success('¡Se programó la notificación exitosamente!');
        }

      } else {
        const error = await res.json();
        setState({ ...state, error: error.error });
      }

      // Limpia el mensaje de error después de 3 segundos
      setTimeout(() => {
        clearMessages();
      }, 3000);

    } catch (error) {
      console.error('Error en la solicitud:', error);
      setState({
        ...state,
        error: 'Error del servidor. Inténtalo de nuevo más tarde.',
        errors: {}
      });
    }
  };

  const handleClients = async () => {
    try {
      const response = await fetch('/api/getClientsList');
      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      const dataClients = await response.json();
      console.log('dataClients', dataClients);
      const clientsEmail = dataClients.map((x) => x.Email);
      console.log(clientsEmail);
      
      const clientsEmailString = clientsEmail.join("; ");

      setState((prevState) => ({
        ...prevState,
        clients: dataClients,
        filteredClients: dataClients,
        to: clientsEmailString,
        isClientOne: false,
      }));

      } catch (error) {
          console.error('Error al obtener clientes:', error);
      }
  };

  const handleSelectClient = (client) => {
    const isSelected = state.selectedClients.some((c) => c.ClientID === client.ClientID);
  
    const updatedSelectedClients = isSelected
      ? state.selectedClients.filter((c) => c.ClientID !== client.ClientID)
      : [...state.selectedClients, client];

    const clientsEmail = updatedSelectedClients.map((x) => x.Email);
    const clientsEmailString = clientsEmail.join("; ");
  
    setState((prevState) => ({
      ...prevState,
      selectedClients: updatedSelectedClients,
      to: clientsEmailString,
    }));
  };

  // const handleAdmin = async () => {
  //   const userAdmin = getUserAdmin();
  //
  //   try {
  //     const res = await fetch('/api/getAdmin', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ username: userAdmin }),
  //     });
  //     if (!res.ok) {
  //         throw new Error(`Error en la solicitud: ${response.statusText}`);
  //     }

  //     const dataAdmin = await response.json();
  //     console.log('dataAdmin', dataAdmin);
  //     const adminEmail = dataAdmin.Email;
  //     console.log(adminEmail);

  //     setState((prevState) => ({
  //       ...prevState,
  //       from: adminEmail,
  //     }));

  //     } catch (error) {
  //         console.error('Error al obtener clientes:', error);
  //     }   
  // };

  const handleTest = async () => {

    // Se envía solicitud de registro con los datos del formulario
    try {
      console.log('state', state);
      const res = await fetch('/api/sendNotificationHandler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: state.from, to: '', title: '', message: '', isScheduled: 0, scheduledDate: '', bookingObject: { BookingDate: "2025-01-25", BookingTime: "00:40:00", ClientID: "110"} }),
      });

      if (res.ok) {
        const mess = await res.json();
        setState({ ...state, successMessage: mess.message });
        if(!state.isScheduled){
          await toast.success('¡Se envío la notificación exitosamente!');
        } else {
          await toast.success('¡Se programó la notificación exitosamente!');
        }

      } else {
        const error = await res.json();
        setState({ ...state, error: error.error });
      }

      // Limpia el mensaje de error después de 3 segundos
      setTimeout(() => {
        clearMessages();
      }, 3000);

    } catch (error) {
      console.error('Error en la solicitud:', error);
      setState({
        ...state,
        error: 'Error del servidor. Inténtalo de nuevo más tarde.',
        errors: {}
      });
    }
  };

  return (  
    <>
      <Head>
        <title>{"Gestion de notificaciones"}</title>
      </Head>

      <div
        className="d-flex flex-column min-vh-100"
        style={{ backgroundColor: '#F5EDE8' }}
      >
        {/* Header */}
        <header
          className="py-3"
          style={{ backgroundColor: '#795D4F', color: '#FFF' }}
        >
          <div className="container d-flex justify-content-between">
            <a href="/servicesList" className="text-white text-decoration-none">
              Volver
            </a>
          </div>
        </header>

        {/* Main Content */}
        <div className="container d-flex flex-grow-1 align-items-center justify-content-center">
        <NotificationForm
          from={state.from}
          to={state.to}
          title={state.title}
          message={state.message}
          isScheduled={state.isScheduled}
          scheduledDate={state.scheduledDate}
          selectedClientOption={state.selectedClientOption}
          isClientOne={state.isClientOne}
          selectedClients={state.selectedClients}
          filteredClients={state.filteredClients}
          searchTerm={state.searchTerm}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onBlur={handleBlur}
          onSelected={handleSelectClient}
          error={state.error}
          errors={state.errors}
          successMessage={state.successMessage}
          onTest={handleTest}
        />
        </div>

      <Footer />
      </div>
  </>
  );
}

export default NotificationPage;