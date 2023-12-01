from flask import Flask, render_template, request, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message

app = Flask(__name__)
#Configuracion de la sesion
app.secret_key = 'mysecretkey'
#Configuracion del modo debug
app.config['DEBUG'] = True
#Configuracion de la base de datos
USER_DB = 'root'
PASS_DB = 'root'
URL_DB = 'localhost'
NAME_DB = 'torneo_zenbit'
FULL_URL_DB = f'mysql+pymysql://{USER_DB}:{PASS_DB}@{URL_DB}/{NAME_DB}'

#Configuracion del proyecto
app.config[ 'SQLALCHEMY_DATABASE_URI'] = FULL_URL_DB
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'zenbit625@gmail.com'
app.config['MAIL_PASSWORD'] = 'lmqz sosu rndy xodc'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
#Configuracion de la base de datos
db = SQLAlchemy(app)
#Configuracion de flask-mail
mail = Mail(app)


#Configurar flask-migrate
from flask_migrate import Migrate
migrate = Migrate()
migrate.init_app(app, db)

#Importar modelos
from models import Participante


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        # Buscar usuario en la base de datos
        participante = Participante.query.filter_by(username=username).first()

        if participante is not None:
            # Verificar contraseña
            if check_password_hash(participante.password, password):
                #flash('Bienvenido de nuevo')
                session['username'] = username
                return redirect(url_for('home', username=username))
            else:
                #flash('La contraseña no es correcta')

                return redirect(url_for('index'))
        else:
           # flash('El usuario no existe')
            return redirect(url_for('index'))
    return render_template('index.html')

# Pagina de registro
@app.route('/registro', methods=['GET', 'POST'])
def registro():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')

        if '@' not in email:
            flash('El email no es valido')
            return redirect(url_for('registro'))

        # Buscar usuario en la base de datos
        participante = Participante.query.filter_by(username=username).first()

        if participante is not None:
            flash('El usuario ya existe')
            return redirect(url_for('registro'))


        # Encriptar contraseña
        password = generate_password_hash(password)

        # Crear usuario
        participante = Participante(username=username, email=email, password=password)

        # Guardar en la base de datos
        db.session.add(participante)
        db.session.commit()

        #Enviar correo de confirmacion
        msg = Message('Bienvenido a Zenbit', sender = 'zenbit625@gmail.com', recipients = [email])
        msg.body = f'Bienvenido a Zenbit, tu username es {username}!'
        mail.send(msg)


        # Redireccionar a otra pagina despues de dar click en el boton registro
        return redirect(url_for('index'))

    return render_template('registro.html')


# Pagina principal
@app.route('/home/<username>')
def home(username):
    if 'username' not in session or session['username'] != username:
        return redirect(url_for('index'))

    return render_template('home.html')

# Pagina del video 
@app.route('/video')
def video():
    return render_template('video.html')

# pagina de presentacion
@app.route('/presentacion')
def presentacion():
    return render_template('presentacion.html')

# Perfil
@app.route('/perfil')
def perfil():
    return render_template('verperfil.html')

# usar modo debug para que se actualice automaticamente
if __name__ == '__main__':
    app.run(debug=True)






