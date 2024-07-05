// Direccion utilizando XAMPP local
const BASEURL = 'http://127.0.0.1:5000';

// Direccion usando PythonAnyware
// const BASEURL = 'https://asaenz.pythonanywhere.com';

async function fetchData(url, method, data = null) {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
    };
    
    try {
      const response = await fetch(url, options);  // Realiza la petición fetch
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();  // Devuelve la respuesta en formato JSON
    } catch (error) {
      console.error('Fetch error:', error);
      Swal.fire({
        title: '¡Error!',
        text: 'Un error ocurrio durante el fetch. Por favor intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
    }
}

async function cargaProductosCategoria(idCategoria) {
    let listaProductosCategoria = await fetchData(`${BASEURL}/api/productos/categoria/${idCategoria}`, 'GET');
    const contenedorProductos = document.getElementById('productos-categoria');
  
    listaProductosCategoria.forEach((producto) => {
        const card = document.createElement('div');
        card.className = 'card-producto';
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p class="nombre-producto">${producto.nombre}</p>
            <p class="precio-producto">$ ${producto.precio}</p>
            <p class="duracion-producto">Duracion: ${producto.duracion} Min</p>
            <button>Añadir al carrito</button>
        `;
        contenedorProductos.appendChild(card);
    });
    
}

async function saberCategoria(idCategoria) {
    let Categoria = await fetchData(`${BASEURL}/api/categorias/${idCategoria}`, 'GET');
    if (Categoria){
        return Categoria
    }
}

async function cargaCategoria() {
    let Categorias = await fetchData(`${BASEURL}/api/categorias`, 'GET');
    const listaCategorias = document.getElementById('lista-categorias');

    Categorias.forEach((categoria) => {
        const card = document.createElement('div');
        card.className = 'card-categoria';
        card.style.backgroundColor = categoria.color_Fondo;
        card.innerText = categoria.nombre;
        card.onclick = () => {
            window.location.href = `/Codo_Codo_Python_Grupo_24/templates/categoria.html?clave=${categoria.ID_categoria}`;
        };
        listaCategorias.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const idCategoria = params.get('clave');

    if (!idCategoria){
        Swal.fire({
            title: '¡Error!',
            text: 'No se proporciono ninguna categoria. Por favor seleccione una',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          });
          return
    }

    const categoriaSeleccionada = await saberCategoria(idCategoria);
    cargaCategoria();
    cargaProductosCategoria(idCategoria);

    // Actualizar el título de la categoría
    document.getElementById('titulo-categoria').innerText = categoriaSeleccionada.nombre;
    // Mostrar la info de la categoria + imagen
    document.getElementById('imagen-categoria').src = categoriaSeleccionada.img_Descripcion;
    document.getElementById('descripcion-categoria').innerText = categoriaSeleccionada.descripcion;
});
