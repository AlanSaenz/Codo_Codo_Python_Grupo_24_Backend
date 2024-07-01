import { categorias } from './datos-categoria.js';
import { listaProductos } from './datos-productos.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const claveCategoria = params.get('clave');
    const categoriaSeleccionada = categorias[claveCategoria];

    // Agregar tarjetas de categorías
    const listaCategorias = document.getElementById('lista-categorias');
    for (const clave in categorias) {
        const { nombre, colorFondo } = categorias[clave];
        const card = document.createElement('div');
        card.className = 'card-categoria';
        card.style.backgroundColor = colorFondo;
        card.innerText = nombre;
        card.onclick = () => {
            window.location.href = `categoria.html?clave=${clave}`;
        };
        listaCategorias.appendChild(card);
    }

    if (!categoriaSeleccionada) {
        console.error('Categoría no encontrada');
        return;
    }

    // Actualizar el título de la categoría
    document.getElementById('titulo-categoria').innerText = categoriaSeleccionada.nombre;

    // Mostrar la info de la categoria + imagen
    document.getElementById('imagen-categoria').src = categoriaSeleccionada.imgDescripcion;
    document.getElementById('descripcion-categoria').innerText = categoriaSeleccionada.descripcion;

    // Agregar tarjetas de los alimentos
    const productos = obtenerProductosPorCategoria(claveCategoria, listaProductos);
    const contenedorProductos = document.getElementById('productos-categoria');
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'card-producto';
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p class="nombre-producto">${producto.nombre}</p>
            <p class="precio-producto">${producto.precio}</p>
            <p class="duracion-producto">Duracion: ${producto.duracion}</p>
            <button>Añadir al carrito</button>
        `;
        contenedorProductos.appendChild(card);
    });
});

// Esta función retorna un array de productos según la categoría o sino devuelve un array vacio.
function obtenerProductosPorCategoria(claveCategoria, listaProductos) {
    return listaProductos[claveCategoria] || [];
}
