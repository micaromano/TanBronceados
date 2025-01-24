'use client';

// pages/editingNotifications.js
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import EditNotification from '../../components/EditNotification';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Head from 'next/head';
import Footer from '../../components/Footer';

function NotificationPage() {
const [state, setState] = useState({
    id: '',
    title: '',
    message: '',
    isScheduled: false,
    scheduledDate: '',
    selectedNotificationOption: '',
    notifications: [],
    error: '',
    errors: {},
    successMessage: ''
});

useEffect(() => {
    handleNotifications();
}, []);

useEffect(() => {
    handleSelectNotification();
}, [state.selectedNotificationOption]);

const router = useRouter();

const handleChange = (e, field) => {  
    const value = field === 'isScheduled' ? e.target.checked : e.target.value;
    
    setState({
        ...state,
        [field]: value,
        errors: {
        ...state.errors,
        [field]: '' // Limpiar el error al cambiar el valor
        }
    });
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
    console.log('notificationID: state.id , notificationTitle: state.title, notificationMessage: state.message', {notificationID: state.id , notificationTitle: state.title, notificationMessage: state.message, isScheduled: state.isScheduled, scheduledDate: state.scheduledDate})
    // Se envía solicitud de registro con los datos del formulario
    try {
    const res = await fetch('/api/editNotification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationID: state.id , notificationTitle: state.title, notificationMessage: state.message, isScheduled: state.isScheduled, scheduledDate: state.scheduledDate }),
    });

    if (res.ok) {
        const mess = await res.json();
        setState({ ...state, successMessage: mess.message });

        if(!state.isScheduled){
          await toast.success('¡Se edito la notificación exitosamente!');
        } else {
          await toast.success('¡Se programó la edición de la notificación exitosamente!');
        }
        handleNotifications();
        
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

const handleNotifications = async () => {
    try {
    const response = await fetch('/api/getNotificationsList');
    if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const dataNotifications = await response.json();

    setState({
        ...state,
        notifications: dataNotifications,
    });

    } catch (error) {
        console.error('Error al obtener clientes:', error);
    }
};

const handleSelectNotification = () => {
    if (state.notifications.length > 0) {

        if (state.selectedNotificationOption === "") {
            // Si la opción es "", vaciar los campos title y message
            setState((prevState) => ({
                ...prevState,
                title: "",
                message: "",
            }));
            return;
        }
            // Buscar la notificación correspondiente
            const notification = state.notifications.find(
                (notification) => notification.AutomatedNotificationID == state.selectedNotificationOption
            );

            console.log('notification', notification);

            if (notification) {
                // Actualizar el estado con los valores encontrados
                setState((prevState) => ({
                    ...prevState,
                    id: notification.AutomatedNotificationID,
                    title: notification.AutomatedNotificationTitle,
                    message: notification.AutomatedNotificationMessage,
                }));
            }
        //}
    }
};

return (  
    <>
    <Head>
        <title>{"Editar notificaciones"}</title>
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
        <EditNotification
        title={state.title}
        message={state.message}
        isScheduled={state.isScheduled}
        scheduledDate={state.scheduledDate}
        selectedNotificationOption={state.selectedNotificationOption}
        notifications={state.notifications}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onBlur={handleBlur}
        onSelected={handleSelectNotification}
        error={state.error}
        errors={state.errors}
        successMessage={state.successMessage}
        />
        </div>

    <Footer />
    </div>
</>
);
}

export default NotificationPage;