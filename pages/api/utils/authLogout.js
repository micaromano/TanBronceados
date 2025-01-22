export async function handleLogout() {
    try {
        const response = await fetch('/api/auth/logout', { method: 'POST' });

        if (!response.ok) {
            throw new Error('Error al cerrar sesión.');
        }

        // Redirigir al usuario a la página de inicio después del logout
        window.location.href = '/';
    } catch (error) {
        console.error('Logout failed:', error.message);
    }
}
