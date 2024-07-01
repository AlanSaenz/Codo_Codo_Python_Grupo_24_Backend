export class Categoria {
    constructor(nombre, colorFondo, srcImagen, descripcion, imgDescripcion, clave) {
        this.nombre = nombre;
        this.colorFondo = colorFondo;
        this.srcImagen = srcImagen;
        this.descripcion = descripcion;
        this.imgDescripcion = imgDescripcion;
        this.clave = clave;
    }

    generar_Card_HTML_index() {
        const card = document.createElement('a');
        card.href = `/Codo_Codo_Python_Grupo_24/templates/categoria.html?clave=${this.clave}`;
        card.className = 'card-categoria';
        card.style.backgroundColor = this.colorFondo;

        card.innerHTML = `
            <p class="nombre-categorias">${this.nombre}</p>
            <div class="categoria-fondo">
                <img class="imagen-categorias" src="${this.srcImagen}" alt="${this.nombre}">
            </div>
        `;
        return card;
    }
}

export function agregarTarjetas(categorias) {
    const container = document.getElementById('contenedor-card-categoria');

    for (const clave in categorias) {
        const { nombre, colorFondo, srcImagen, descripcion, imgDescripcion } = categorias[clave];
        const categoria = new Categoria(nombre, colorFondo, srcImagen, descripcion, imgDescripcion, clave);
        container.appendChild(categoria.generar_Card_HTML_index());
    }
}
