from flask import Flask, blueprint , render_template
from flask_sqlalchemy import SQLAlchemy
from . import models

bp = blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/')
def login():
    return render_template('index.html')