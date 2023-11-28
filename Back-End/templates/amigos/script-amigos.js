document.addEventListener("DOMContentLoaded", function () {
    const verPerfilBtn = document.getElementById("verPerfilBtn");
    const agregarAmigoBtn = document.getElementById("agregarAmigoBtn");
    const listaAmigos = document.getElementById("listaAmigos");

    verPerfilBtn.addEventListener("click", function () {
        // Lógica para ver el propio perfil
        alert("Funcionalidad para ver el propio perfil");
    });

    agregarAmigoBtn.addEventListener("click", function () {
        // Lógica para agregar un nuevo amigo
        const nombreAmigo = document.getElementById("nombreAmigo").value;
        const rubroAmigo = document.getElementById("rubroAmigo").value;

        if (nombreAmigo.trim() !== "") {
            // Crear nuevo elemento de lista para el amigo
            const nuevoAmigo = document.createElement("li");
            nuevoAmigo.innerHTML = `<strong>${nombreAmigo}</strong> - ${rubroAmigo} <button class="verPerfilBtn">Ver Perfil</button>`;
            
            // Agregar el amigo a la lista
            listaAmigos.appendChild(nuevoAmigo);

            // Limpiar los campos de entrada
            document.getElementById("nombreAmigo").value = "";
            document.getElementById("rubroAmigo").value = "trabajo";

            // Asignar evento al botón de ver perfil del amigo
            const btnVerPerfilAmigo = nuevoAmigo.querySelector(".verPerfilBtn");
            btnVerPerfilAmigo.addEventListener("click", function () {
                // Lógica para ver el perfil del amigo
                mostrarPerfil(nombreAmigo);
            });
        } else {
            alert("Ingresa un nombre válido para tu amigo.");
        }
    });

    function mostrarPerfil(nombreAmigo) {
        // Simulamos información de perfil para la demostración
        const perfilFicticio = {
            usuario: `Usuario_${nombreAmigo}`,
            correo: `${nombreAmigo.toLowerCase()}@example.com`,
            foto: `https://via.placeholder.com/150`, // URL de una imagen ficticia
        };

        // Crear un elemento de ventana emergente
        const ventanaEmergente = document.createElement("div");
        ventanaEmergente.classList.add("ventana-emergente");

        // Agregar contenido al elemento de ventana emergente
        ventanaEmergente.innerHTML = `
            <h2>Perfil de ${nombreAmigo}</h2>
            <p><strong>Usuario:</strong> ${perfilFicticio.usuario}</p>
            <p><strong>Correo:</strong> ${perfilFicticio.correo}</p>
            <img src="${perfilFicticio.foto}" alt="Foto de Perfil">
            <button onclick="cerrarVentanaEmergente()">Cerrar</button>
        `;

        // Agregar la ventana emergente al cuerpo del documento
        document.body.appendChild(ventanaEmergente);
    }

    // Función para cerrar la ventana emergente
    window.cerrarVentanaEmergente = function () {
        const ventanaEmergente = document.querySelector(".ventana-emergente");
        if (ventanaEmergente) {
            document.body.removeChild(ventanaEmergente);
        }
    };
});
