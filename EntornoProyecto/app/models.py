from app.database import get_db

class Categoria:
    def __init__(self, ID_categoria=None, nombre=None, color_Fondo=None, src_Imagen=None, descripcion=None, img_Descripcion=None, clave=None):
        self.ID_categoria = ID_categoria
        self.nombre = nombre
        self.color_Fondo = color_Fondo
        self.src_Imagen = src_Imagen
        self.descripcion = descripcion
        self.img_Descripcion = img_Descripcion
        self.clave = clave

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.ID_categoria:
            cursor.execute("""
                UPDATE Categoria SET nombre = %s, color_Fondo = %s, src_Imagen = %s, descripcion = %s, img_Descripcion = %s, clave = %s
                WHERE ID_categoria = %s
            """, (self.nombre, self.color_Fondo, self.src_Imagen, self.descripcion, self.img_Descripcion, self.clave, self.ID_categoria))
        else:
            cursor.execute("""
                INSERT INTO Categoria (nombre, color_Fondo, src_Imagen, descripcion, img_Descripcion, clave) VALUES (%s, %s, %s, %s, %s, %s)
            """, (self.nombre, self.color_Fondo, self.src_Imagen, self.descripcion, self.img_Descripcion, self.clave))
            self.ID_categoria = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Categoria")
        rows = cursor.fetchall()
        categorias = [Categoria(ID_categoria=row[0], nombre=row[1], color_Fondo=row[2], src_Imagen=row[3], descripcion=row[4], img_Descripcion=row[5], clave=row[6]) for row in rows]
        cursor.close()
        return categorias

    @staticmethod
    def get_by_id(categoria_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Categoria WHERE ID_categoria = %s", (categoria_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Categoria(ID_categoria=row[0], nombre=row[1], color_Fondo=row[2], src_Imagen=row[3], descripcion=row[4], img_Descripcion=row[5], clave=row[6])
        return None

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM Categoria WHERE ID_categoria = %s", (self.ID_categoria,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'ID_categoria': self.ID_categoria,
            'nombre': self.nombre,
            'color_Fondo': self.color_Fondo,
            'src_Imagen': self.src_Imagen,
            'descripcion': self.descripcion,
            'img_Descripcion': self.img_Descripcion,
            'clave': self.clave
        }



class Producto:
    def __init__(self, ID_producto=None, ID_categoria=None, nombre=None, imagen=None, precio=None, duracion=None):
        self.ID_producto = ID_producto
        self.ID_categoria = ID_categoria
        self.nombre = nombre
        self.imagen = imagen
        self.precio = precio
        self.duracion = duracion

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.ID_producto:
            cursor.execute("""
                UPDATE Producto SET ID_categoria = %s, nombre = %s, imagen = %s, precio = %s, duracion = %s
                WHERE ID_producto = %s
            """, (self.ID_categoria, self.nombre, self.imagen, self.precio, self.duracion, self.ID_producto))
        else:
            cursor.execute("""
                INSERT INTO Producto (ID_categoria, nombre, imagen, precio, duracion) VALUES (%s, %s, %s, %s, %s)
            """, (self.ID_categoria, self.nombre, self.imagen, self.precio, self.duracion))
            self.ID_producto = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Producto")
        rows = cursor.fetchall()
        productos = [Producto(ID_producto=row[0], ID_categoria=row[1], nombre=row[2], imagen=row[3], precio=row[4], duracion=row[5]) for row in rows]
        cursor.close()
        return productos
    
    @staticmethod
    def get_by_categoria(categoria_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Producto WHERE ID_categoria = %s", (categoria_id,))
        rows = cursor.fetchall()
        productos = [Producto(ID_producto=row[0], ID_categoria=row[1], nombre=row[2], imagen=row[3], precio=row[4], duracion=row[5]) for row in rows]
        cursor.close()
        return productos

    @staticmethod
    def get_by_id(producto_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Producto WHERE ID_producto = %s", (producto_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Producto(ID_producto=row[0], ID_categoria=row[1], nombre=row[2], imagen=row[3], precio=row[4], duracion=row[5])
        return None

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM Producto WHERE ID_producto = %s", (self.ID_producto,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'ID_producto': self.ID_producto,
            'ID_categoria': self.ID_categoria,
            'nombre': self.nombre,
            'imagen': self.imagen,
            'precio': self.precio,
            'duracion': self.duracion
        }
