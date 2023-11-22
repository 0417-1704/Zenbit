#Loggin de una pagina de videojuegos

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#Configuracion de la base de datos
USER_DB = 'root'
PASS_DB = 'root'
URL_DB = 'localhost'
NAME_DB = 'torneo_zenbit'
FULL_URL_DB = f'mysql+pymysql://{USER_DB}:{PASS_DB}@{URL_DB}/{NAME_DB}'

#Configuracion del proyecto
app.config[ 'SQLALCHEMY_DATABASE_URI'] = FULL_URL_DB
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#Configuracion de la base de datos
db = SQLAlchemy(app)

#Configurar flask-migrate
from flask_migrate import Migrate
migrate = Migrate()
migrate.init_app(app, db)

#Importar modelos
from models import Participante


@app.route('/index')
def index():
    return render_template('index.html')

# Pagina de registro
@app.route('/registro')
def registro():
    return render_template('registro.html')

# Pagina principal
@app.route('/home')
def home():
    return render_template('home.html')

# Pagina de login
@app.route('/login')
def login():
    return render_template('login.html')

# Pagina del video 
@app.route('/video')
def video():
    return render_template('video.html')

# pagina de presentacion
@app.route('/presentacion')
def presentacion():
    return render_template('presentacion.html')

# pagina de visualizacion de perfil
@app.route('/verPerfil')
def presentacion():
    return render_template('verPerfil.html')

# pagina de edición de perfil
@app.route('/editarPerfil')
def presentacion():
    return render_template('editarPerfil.html')


# usar modo debug para que se actualice automaticamente
if __name__ == '__main__':
    app.run(debug=True)






