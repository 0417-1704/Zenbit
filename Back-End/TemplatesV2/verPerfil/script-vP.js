// Datos de perfil (simulados, reemplázalos con datos reales obtenidos del servidor)
const profileData = {
    username: "UsuarioEjemplo",
    email: "usuario@example.com",
    profileImage: "default-profile-image.png"
};

document.addEventListener("DOMContentLoaded", function () {
    // Cargar datos de perfil
    displayProfileData();
});

function displayProfileData() {
    // Mostrar datos de perfil en la página
    document.getElementById("username").textContent = "Nombre de Usuario: " + profileData.username;
    document.getElementById("email").textContent = "Correo: " + profileData.email;
    document.getElementById("profile-image").src = profileData.profileImage;
}
