document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    let formulario = document.getElementById('formulario');
    let nombre = document.getElementById('nombre');
    let apellido = document.getElementById('apellido');
    let email = document.getElementById('email');
    let dni = document.getElementById('dni');
    let tel = document.getElementById('tel');
    let genero = document.querySelector('input[name="genero"]:checked');
    let nacionalidad = document.getElementById('nacionalidad');
    let foto = document.getElementById('foto');
    let error = document.getElementById('error');
    // Vacia el contenedor de error
    error.innerHTML = '';

    // Se realizan las distintas validaciones a los campos
    if (!/^[a-zA-Z]{1,12}$/.test(nombre.value.trim())) {
        error.innerHTML = 'El nombre debe tener máximo 12 letras y solo letras.';
        return;
    }

    if (!/^[a-zA-Z]{1,12}$/.test(apellido.value.trim())) {
        error.innerHTML = 'El apellido debe tener máximo 12 letras y solo letras.';
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.value.trim())) {
        error.innerHTML = 'El email debe ser válido (contener "@" y ".com" o ".ar").';
        return;
    }

    if (!/^\d{8}$/.test(dni.value.trim())) {
        error.innerHTML = 'El número de documento debe tener 8 dígitos.';
        return;
    }

    if (!/^\d{8,12}$/.test(tel.value.trim())) {
        error.innerHTML = 'El número de teléfono debe tener entre 8 y 12 dígitos.';
        return;
    }

    if (!genero) {
        error.innerHTML = 'Debe seleccionar un género.';
        return;
    }

    if (!nacionalidad.value) {
        error.innerHTML = 'Debe seleccionar una nacionalidad.';
        return;
    }

    if (!foto.files[0]) {
        error.innerHTML = 'Debe cargar una foto.';
        return;
    }

    // Si todos los campos son validos, se "envia" el formulario
    alert("El formulario se completo y envio correctamente.")
    formulario.reset();
});
