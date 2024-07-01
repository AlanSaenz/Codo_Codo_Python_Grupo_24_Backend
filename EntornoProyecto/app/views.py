from flask import jsonify, request
from app.models import Categoria, Producto

# INDEX
def index():
    return jsonify({'message': 'Bienvenido a la API de Bambu y Sabores. Este es el INDEX'})

# CATEGORIAS
def get_all_categorias():
    categorias = Categoria.get_all()
    return jsonify([categoria.serialize() for categoria in categorias])

def get_categoria(categoria_id):
    categoria = Categoria.get_by_id(categoria_id)
    if not categoria:
        return jsonify({'message': 'Categoria no encontrada'}), 404
    return jsonify(categoria.serialize())

def delete_categoria(categoria_id):
    categoria = Categoria.get_by_id(categoria_id)
    if not categoria:
        return jsonify({'message': 'Categoria no encontrada'}), 404
    categoria.delete()
    return jsonify({'message': 'Categoria eliminada exitosamente'})

# PRODUCTOS
def create_producto():
    data = request.json
    new_producto = Producto(ID_categoria=data['ID_categoria'], nombre=data['nombre'], imagen=data['imagen'], precio=data['precio'], duracion=data['duracion'])
    new_producto.save()
    return jsonify({'message': 'Producto creado exitosamente'}), 201

def get_all_productos():
    productos = Producto.get_all()
    return jsonify([producto.serialize() for producto in productos])

def get_producto_categoria(categoria_id):
    productos = Producto.get_by_categoria(categoria_id)
    if not productos:
        return jsonify({'message': 'Error al encontrar los productos'}), 404
    return jsonify([producto.serialize() for producto in productos])

def get_producto(producto_id):
    producto = Producto.get_by_id(producto_id)
    if not producto:
        return jsonify({'message': 'Producto no encontrado'}), 404
    return jsonify(producto.serialize())

def update_producto(producto_id):
    producto = Producto.get_by_id(producto_id)
    if not producto:
        return jsonify({'message': 'Producto no encontrado'}), 404
    data = request.json

    if not data or not all(key in data for key in ('ID_categoria', 'nombre', 'imagen', 'precio', 'duracion')):
        return jsonify({'message': 'Datos faltantes o incorrectos'}), 400
    
    producto.ID_categoria = data['ID_categoria']
    producto.nombre = data['nombre']
    producto.imagen = data['imagen']
    producto.precio = data['precio']
    producto.duracion = data['duracion']
    producto.save()
    return jsonify({'message': 'Producto actualizado exitosamente'})

def delete_producto(producto_id):
    producto = Producto.get_by_id(producto_id)
    if not producto:
        return jsonify({'message': 'Producto no encontrado'}), 404
    producto.delete()
    return jsonify({'message': 'Producto eliminado exitosamente'})
