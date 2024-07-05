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
    // alert('Un error ocurrio durante el fetch. Por favor intenta de nuevo.');
    Swal.fire({
      title: '¡Error!',
      text: 'Un error ocurrio durante el fetch. Por favor intenta de nuevo.',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }
}

// Funcion para mostrar todos los productos
async function mostrarTodosLosProductos() {
  let productos = await fetchData(BASEURL + '/api/productos', 'GET');
  const productosContainer = document.querySelector('#tbody-lista-productos');
  productosContainer.innerHTML = '';

  productos.forEach((producto) => {
    producto_categoria = saberCategoria_id(producto.ID_categoria)
    let tr = `<tr>
                  <td class="nombre-producto">${producto.nombre}</td>
                  <td class="categoria-producto">${producto_categoria}</td>
                  <td class="precio-producto">$${producto.precio}</td>
                  <td class="duracion-producto">${producto.duracion} min</td>
                  <td>
                      <img src="${producto.imagen}" width="100%">
                  </td>
                  <td>
                      <button class="btn btn-verde btn-modificar" onclick='mostrarActualizarProducto(${producto.ID_producto})'><i class="fa fa-pencil"></i></button>
                      <button class="btn btn-rojo btn-eliminar" onclick='eliminarProducto(${producto.ID_producto})'><i class="fa fa-trash"></i></button>
                  </td>
              </tr>`;
      productosContainer.insertAdjacentHTML("beforeend", tr);
  });
}

// Funcion para mostrar los productos de una categoria
async function mostrarProductosPorCategoria(idCategoria) {
  let url = `${BASEURL}/api/productos/categoria/${idCategoria}`;
  let productos = await fetchData(url, 'GET');
  const productosContainer = document.querySelector('#tbody-lista-productos');
  productosContainer.innerHTML = '';

  productos.forEach((producto) => {
    producto_categoria = saberCategoria_id(producto.ID_categoria)
    let tr = `<tr>
                  <td class="nombre-producto">${producto.nombre}</td>
                  <td class="categoria-producto">${producto_categoria}</td>
                  <td class="precio-producto">$${producto.precio}</td>
                  <td class="duracion-producto">${producto.duracion} min</td>
                  <td>
                      <img src="${producto.imagen}" width="100%">
                  </td>
                  <td>
                      <button class="btn btn-verde btn-modificar" onclick='mostrarActualizarProducto(${producto.ID_producto})'><i class="fa fa-pencil"></i></button>
                      <button class="btn btn-rojo btn-eliminar" onclick='eliminarProducto(${producto.ID_producto})'><i class="fa fa-trash"></i></button>
                  </td>
              </tr>`;
      productosContainer.insertAdjacentHTML("beforeend", tr);
  });
}

// Funcion para realizar la recarga de los productos en la lista
async function mostrarProductos(){
  const categoriaSeleccionada = document.getElementById('filtro').value;
    if (categoriaSeleccionada !== 'todos'){
      mostrarProductosPorCategoria(categoriaSeleccionada);
    } else {
      mostrarTodosLosProductos();
    }
}

// Funcion para saber el nombre de la categoria por su ID
function saberCategoria_id(id) {
  switch (id) {
    case 1:
      return "Tradicional China"
  
    case 2:
      return "Hamburguesas"
    
    case 3:
      return "Tradicional Argentina"

    case 4:
      return "Bebidas"
      
    case 5:
      return "Pollo y Pescado"
    
    case 6:
      return "Ensaladas y Verduras"
  
    case 7:
      return "Postres"
        
    case 8:
      return "Desayuno"
  }
}

// Funcion para saber la direccion predeterminadas
function imagenPredeterminadaUrl(categoriaId) {
  switch (categoriaId) {
      case '1':
          return "/Codo_Codo_Python_Grupo_24/static/img/Categorias/tradicional-china.jpg";
      case '2':
          return "/Codo_Codo_Python_Grupo_24/static/img/Categorias/hamburguesas.jpg";
      case '3':
          return "/Codo_Codo_Python_Grupo_24/static/img/Categorias/tradicional-argentina.jpg";
      case '4':
          return "/Codo_Codo_Python_Grupo_24/static/img/Categorias/bebidas.jpg";
      case '5':
          return "/Codo_Codo_Python_Grupo_24/static/img/Categorias/pollo-pescado.jpg";
      case '6':
          return "/Codo_Codo_Python_Grupo_24/static/img/Categorias/ensaladas-verduras.jpg";
      case '7':
          return "/Codo_Codo_Python_Grupo_24/static/img/Categorias/postres.jpg";
      case '8':
          return "/Codo_Codo_Python_Grupo_24/static/img/Categorias/desayunos.jpg";
      default:
          return "";
  }
}

// Obtiene los datos de las categorias de la base de datos y lo inserta en el Select del formulario y del filtro
async function cargaCategorias() {
  let categorias = await fetchData(BASEURL + '/api/categorias', 'GET');
  const opcionesCategoriasProductos = document.getElementById('filtro');
  const inputOpcionesFormulario = document.getElementById('categoria');
  
  opcionesCategoriasProductos.innerHTML = '<option value="todos" selected>Todos los productos</option>';
  inputOpcionesFormulario.innerHTML = '';

  categorias.forEach((categoria) => {
    let opcion = `<option value=${categoria.ID_categoria}>${categoria.nombre}</option>`;
    opcionesCategoriasProductos.insertAdjacentHTML("beforeend", opcion);
    inputOpcionesFormulario.insertAdjacentHTML("beforeend", opcion);
  });
  
}

// Traslada al formulario y completa los datos del producto seleccionado para modificar
async function mostrarActualizarProducto(id) {
  let producto = await fetchData(`${BASEURL}/api/productos/${id}`, 'GET');

  if (producto){
    document.getElementById('id-producto').value = id;
    const nombre = document.getElementById('nombre');
    const categoria = document.getElementById('categoria');
    const imagen = document.getElementById('imagen');
    const precio = document.getElementById('precio');
    const duracion = document.getElementById('duracion');

    const formProducto = document.getElementById('form-producto');
    formProducto.classList.remove('hidden');

    document.getElementById('form-titulo').textContent = `Modificar el producto ${await producto.nombre.toString()}`;

    document.getElementById('contenedor-botones').innerHTML = '';
    let nuevosBotonesActualizar = `<button type="submit" class="btn btn-verde" id="btn-submit" onclick='actualizarProducto(${id})'>Actualizar producto</button>
    <button type="button" class="btn btn-rojo" id="btn-cancelar" onclick='botonCancelar()'>Cancelar</button>`;
    document.getElementById('contenedor-botones').insertAdjacentHTML("afterbegin",nuevosBotonesActualizar);

    // Asignar valores al formulario
    nombre.value = await producto.nombre.toString();
    categoria.value = producto.ID_categoria;
    imagen.value = await producto.imagen.toString();
    precio.value = parseFloat(producto.precio.toString());
    duracion.value = parseInt(producto.duracion.toString().replace(' min', ''));

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
}

// Realiza la peticion fetch para actualizar el producto y es validado el formulario
async function actualizarProducto(id) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const categoria = document.getElementById('categoria').value;
  const imagen = document.getElementById('imagen').value;
  const precio = document.getElementById('precio').value;
  const duracion = document.getElementById('duracion').value;

  //VALIDACION DE FORMULARIO
  if (!nombre || !categoria || !imagen || !precio || !duracion) {
    // alert('Por favor completa todos los campos.');
    Swal.fire({
      title: 'Error!',
      text: 'Por favor completa todos los campos.',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
    return;
  }

  Swal.fire({
    title: "Actualizar producto",
    text: "¿Estás seguro de actualizar este producto?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Actualizar producto",
    cancelButtonText: "Cancelar"
  }).then(async (result) => {
    if (result.isConfirmed) {

      const productoActualizado = {
        ID_categoria: categoria,
        nombre: nombre,
        imagen: imagen,
        precio: precio,
        duracion: duracion
      };

      let actualizar = await fetchData(`${BASEURL}/api/productos/${id}`, 'PUT', productoActualizado);
      if (actualizar) {
        // alert("El Producto fue actualizado correctamente");
        Swal.fire({
          title: '¡Éxito!',
          text: 'El Producto fue actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
        mostrarProductos();
        botonCancelar(); 
      } else {
        // alert("El Producto no se pudo actualizar. Intente nuevamente");
        Swal.fire({
          title: '¡Error!',
          text: 'El Producto no se pudo actualizar. Intente nuevamente',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
      
    } else {
      return
    }
  });
}

// Realiza la peticion fetch para eliminar el producto
async function eliminarProducto(id) {

  Swal.fire({
    title: "Eliminar producto",
    text: "¿Estás seguro de eliminar este producto?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar producto",
    cancelButtonText: "Cancelar"
  }).then(async (result) => {
    if (result.isConfirmed) {
      let eliminacion = await fetchData(`${BASEURL}/api/productos/${id}`, 'DELETE');
      if(eliminacion){
        // alert("El Producto fue eliminado correctamente")
        Swal.fire({
          title: '¡Éxito!',
          text: 'El Producto fue eliminado correctamente',
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
        mostrarProductos();
        botonCancelar();
      } else {
        // alert("El Producto no se pudo eliminar. Intente nuevamente")
        Swal.fire({
          title: '¡Error!',
          text: 'El Producto no se pudo eliminar. Intente nuevamente',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    } else {
      return
    }
  });
}

// Realiza la peticion fetch para crear el producto y validado el formulario
async function crearProducto() {
  event.preventDefault();

  const id_producto = document.getElementById('id-producto').value;
  const nombre = document.getElementById('nombre').value; // Nombre del producto
  const categoria = document.getElementById('categoria').value; // ID de la categoria del producto
  const imagen = document.getElementById('imagen').value; // Direccion de imagen
  const precio = document.getElementById('precio').value; // Precio del producto
  const duracion = document.getElementById('duracion').value; // Duracion en minutos del producto

  //VALIDACION DE FORMULARIO
  if (!nombre || !categoria || !imagen || !precio || !duracion) {
    // alert('Por favor completa todos los campos.');
    Swal.fire({
      title: 'Error!',
      text: 'Por favor completa todos los campos.',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
    return;
  }
  
  // Crea un objeto con los datos de la película
  const productoNuevo = {
    ID_categoria: categoria,
    nombre: nombre,
    imagen: imagen,
    precio: precio,
    duracion: duracion
  };    
    
  let resultado = null;
  // Si hay un producto con ese ID
  if(id_producto !== ""){
    resultado = await fetchData(`${BASEURL}/api/productos/${id_producto}`, 'PUT', productoNuevo);
  }else{
    // Si no hay ID, realiza una petición POST para crear un nuevo producto
    resultado = await fetchData(`${BASEURL}/api/productos`, 'POST', productoNuevo);
  }
  
  document.getElementById('producto-form').reset();
  // alert("El producto se creo satisfactoriamente")
  Swal.fire({
    title: 'Éxito!',
    text: 'El producto se creó satisfactoriamente',
    icon: 'success',
    confirmButtonText: 'Cerrar'
  });

  const formProducto = document.getElementById('form-producto');
  formProducto.classList.add('hidden');

  mostrarProductos();
  botonCancelar();
}

// Funcion del boton "Agregar producto"
function botonAgregar(){
  const formProducto = document.getElementById('form-producto');
  formProducto.classList.remove('hidden');

  document.getElementById('contenedor-botones').innerHTML = '';
  let nuevosBotonesAgregar = `<button type="submit" class="btn btn-verde" id="btn-submit" onclick='crearProducto()'>Agregar producto</button>
    <button type="button" class="btn btn-rojo" id="btn-cancelar" onclick='botonCancelar()'>Cancelar</button>`;
  document.getElementById('contenedor-botones').insertAdjacentHTML("afterbegin",nuevosBotonesAgregar);
  document.getElementById('form-titulo').textContent = `Agregar nuevo producto`;
  document.getElementById('btn-submit').textContent = 'Agregar producto';

  document.getElementById('producto-form').reset();
  document.getElementById('id-producto').value = ''
}

// Funcion del boton "Cancelar" que cierra y reinicia el formulario
function botonCancelar(){
  const formProducto = document.getElementById('form-producto');
  formProducto.classList.add('hidden');
  document.getElementById('producto-form').reset();
}

document.addEventListener('DOMContentLoaded', function() {
  const filtroSelect = document.getElementById('filtro');
  const usarImagenPredeterminada = document.getElementById('usarImagenPredeterminada');
  const imagenInput = document.getElementById('imagen');
  const categoriaSelect = document.getElementById('categoria');

  filtroSelect.addEventListener('change', function() {
    const categoriaSeleccionada = filtroSelect.value;
    if (categoriaSeleccionada !== 'todos'){
        mostrarProductosPorCategoria(categoriaSeleccionada);
    } else {
        mostrarTodosLosProductos();
    }
});

  usarImagenPredeterminada.addEventListener('change', function() {
    if (usarImagenPredeterminada.checked) {
        imagenInput.disabled = true;
        const categoriaSeleccionada = categoriaSelect.value;
        imagenInput.value = imagenPredeterminadaUrl(categoriaSeleccionada);
    } else {
        imagenInput.disabled = false;
        imagenInput.value = '';
    }
});

categoriaSelect.addEventListener('change', function() {
    if (usarImagenPredeterminada.checked) {
        const categoriaSeleccionada = categoriaSelect.value;
        imagenInput.value = imagenPredeterminadaUrl(categoriaSeleccionada);
    }
});

  // Carga de los datos al terminar de cargar el DOM
  cargaCategorias()
  mostrarTodosLosProductos();
});