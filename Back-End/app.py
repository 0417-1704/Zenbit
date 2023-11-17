#Loggin de una pagina de videojuegos

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
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




