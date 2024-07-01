// Importar la informacion y tambien la clase categoria
import { agregarTarjetas } from './categoria-objeto.js';
import { categorias } from './datos-categoria.js';

// Carousel de imagenes del Index
const IMAGENES = [
    'static/img/categoria1.jpg',
    'static/img/categoria2.jpg',
    'static/img/categoria3.jpg',
    'static/img/categoria4.jpg'
];

const DESCRIPCION = [
    'BAOZI nuestra especialidad de la casa',
    'Los clasicos no se olvidan, prueba nuestros alimentos mas consumidos',
    'La tradicion siempre presente, las milanesas mas deliciosas del Pais',
    'Salteado Wok, la herramienta para las comidas mas saludables'
];

const ENLACE = [
    '/templates/categoria.html?clave=tradicional-china',
    '/templates/categoria.html?clave=hamburguesas',
    '/templates/categoria.html?clave=tradicional-argentina',
    '/templates/categoria.html?clave=tradicional-china'
];

let posicionActual = 0;
const $botonRetroceder = document.querySelector('#retroceder');
const $botonAvanzar = document.querySelector('#avanzar');
const $imagen = document.querySelector('#imagen');
const $textoImagen = document.querySelector('.texto-imagen');
const $botonImagen = document.querySelector('.boton-imagen');

function pasarFoto() {
    posicionActual = (posicionActual + 1) % IMAGENES.length;
    renderizarImagen();
}

function retrocederFoto() {
    posicionActual = (posicionActual - 1 + IMAGENES.length) % IMAGENES.length;
    renderizarImagen();
}

function renderizarImagen() {
    $imagen.classList.remove('fade-in');
    $imagen.classList.add('fade-out');
    setTimeout(() => {
        $imagen.setAttribute("src", IMAGENES[posicionActual]);
        $textoImagen.innerHTML = DESCRIPCION[posicionActual];
        $botonImagen.setAttribute("href",ENLACE[posicionActual]);
        $imagen.classList.remove('fade-out');
        $imagen.classList.add('fade-in');
    }, 400);
}

function renderizarImagenInicio() {
    $imagen.classList.add('fade-in');
    $imagen.setAttribute("src", IMAGENES[posicionActual]);
    $textoImagen.innerHTML = DESCRIPCION[posicionActual];
}

function iniciarCarousel() {
    renderizarImagenInicio();
    let autoPlayIntervalo = setInterval(pasarFoto, 3000);

    $botonAvanzar.addEventListener('click', () => {
        pasarFoto();
        clearInterval(autoPlayIntervalo);
        autoPlayIntervalo = setInterval(pasarFoto, 3000);
    });
    
    $botonRetroceder.addEventListener('click', () => {
        retrocederFoto();
        clearInterval(autoPlayIntervalo);
        autoPlayIntervalo = setInterval(pasarFoto, 3000);
    });
}

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

window.onload = function() {
    iniciarCarousel();
    agregarTarjetas(categorias);
};