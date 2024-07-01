# Codo_Codo_Python_Grupo_24_Backend
Proyecto para el grupo numero 24 del curso Codo a Codo Full Stack Python.

Titulo del proyecto: "Bambú y Sabores: Descubre y Ordena Comida China Auténtica"

El proyecto trata de una pagina donde el usuario puede ver la lista de alimentos de un restaurante con tematica "Comida China". En la pagina el usuario podra:
- Visualizar las diferentes categorias de alimentos en venta, posibles descuentos.
- Ver los alimentos de una categoria de comida.
- Poder completar un formulario para inscribirse como usuario Premium y recibir descuentos o posibles promos.
- Informacion sobre el negocio y un "¿quienes somos?"
- Seleccionar un alimento y poder agregarlo a un "carrito de pedidos" (futura mejora)
y mas funciones.

Actualizacion BACKEND:
Se realiza una base de datos en el lenguaje de MySQL, utilizando a XAMPP y FLASK.

Dentro de la carpeta "EntornoProyecto", primero se debe iniciar/activar el entorno que se encuentra en la carpeta "Scripts".

Lo siguiente es iniciar el archivo "run.py" para generar la API que permite la conexion con la base de datos por peticiones Fetch realizadas en el JS. Es importante recordar que si se esta usando XAMPP, este debe de iniciarse primero.

Por ultimo es necesario ejecutar el archivo "Index.html" dentro de la carpeta "Codo_Codo_Python_Grupo_24" para empezar a visualizar la pagina.

BASE DE DATOS:
Para la creacion de la base de datos, se creo un archivo "BD_script.txt" con las lineas de codigo en MySQL para que sea creado las tablas y se inserte en ellas la informacion.

Importante:

- La base de datos debe tener el nombre de: "db_bambu_y_sabores".
- En el archivo ".env" ubicado en la carpeta de "EntornoProyecto" se debe corroborar que los datos son los mismo que se utilizan en la base de datos como por ejemplo el puerto que se utiliza.
- Es necesario e importante revisar que esten instaladas todas las dependencias en el entorno, se puede intalar utilizando el archivo "requirements.txt" dentro de la carpeta EntornoProyecto.

Integrantes:
- Alan Saenz
- Aylén Granatto
- Fabiola Agüero
