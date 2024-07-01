from flask import Flask
from flask_cors import CORS
from app.database import init_app
from app.views import *

app = Flask(__name__)

# Inicializar la base de datos con la aplicación Flask
init_app(app)

#permitir solicitudes desde cualquier origen
CORS(app)

# Rutas para el CRUD de la entidad Movie
app.add_url_rule('/', 'index', index)
app.add_url_rule('/api/categorias', 'get_all_categorias', get_all_categorias, methods=['GET'])
app.add_url_rule('/api/categorias/<int:categoria_id>', 'get_categoria', get_categoria, methods=['GET'])
app.add_url_rule('/api/categorias/<int:categoria_id>', 'delete_categoria', delete_categoria, methods=['DELETE'])

app.add_url_rule('/api/productos', 'create_producto', create_producto, methods=['POST'])
app.add_url_rule('/api/productos', 'get_all_productos', get_all_productos, methods=['GET'])
app.add_url_rule('/api/productos/categoria/<int:categoria_id>', 'get_producto_categoria', get_producto_categoria, methods=['GET'])
app.add_url_rule('/api/productos/<int:producto_id>', 'get_producto', get_producto, methods=['GET'])
app.add_url_rule('/api/productos/<int:producto_id>', 'update_producto', update_producto, methods=['PUT'])
app.add_url_rule('/api/productos/<int:producto_id>', 'delete_producto', delete_producto, methods=['DELETE'])

if __name__ == '__main__':
    app.run(debug=True)