from app import db

class Participante(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False) #unique=True, para que no se repita
    #Password encriptada
    password = db.Column(db.Text, nullable=False)
    email = db.Column(db.String(80), nullable=False)

    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email

    def __repr__(self):
        return '<Participante %r>' % self.username


class Adninistrador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False) #unique=True, para que no se repita
    #Password encriptada
    password = db.Column(db.Text, nullable=False)
    email = db.Column(db.String(80), nullable=False)

    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email

    def __repr__(self):
        return '<Adninistrador %r>' % self.username

class Juego(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), unique=True, nullable=False)
    descripcion = db.Column(db.Text)
    creado_por = db.Column(db.String(80), db.ForeignKey('adninistrador.username'), nullable=False)
    imagen = db.Column(db.String(80), nullable=False)
    categoria = db.Column(db.String(80), nullable=False)
    finalizado = db.Column(db.Boolean, default=False)

    def __init__(self, nombre, descripcion, precio, imagen, categoria, creado_por, finalizado = False):

        self.nombre = nombre
        self.descripcion = descripcion
        self.precio = precio
        self.imagen = imagen
        self.categoria = categoria
        self.creado_por = creado_por
        self.finalizado = finalizado

    def __repr__(self):
        return '<Juego %r>' % self.nombre



