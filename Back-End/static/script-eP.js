document.addEventListener("DOMContentLoaded", function () {
    // Cargar datos de perfil
    displayProfileData();

    // Configurar el botón de cancelar edición
    const cancelEditBtn = document.getElementById("cancel-edit-btn");
    cancelEditBtn.addEventListener("click", function () {
        // Redirigir de vuelta a la página de visualización de perfil (aún no implementada)
        // Puedes utilizar window.location.href = "view-profile.html" para redirigir
        alert("¡Funcionalidad de cancelar edición aún no implementada!");
    });

    // Agregar evento de envío del formulario
    const editProfileForm = document.getElementById('edit-profile-form');
    editProfileForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe por defecto

        // Validar las contraseñas
        const newPassword = document.getElementById('edit-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden. Por favor, vuelve a intentar.");
            return; // Detener el proceso si las contraseñas no coinciden
        }

        // Resto de la lógica de envío del formulario...
    });
});

function displayProfileData() {
    // Mostrar datos de perfil en la página (mantén la lógica existente)
}
