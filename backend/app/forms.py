from wtforms import Form, StringField, PasswordField, validators
from app.utils.validators import validate_email_domain

class RegisterForm(Form):
    name = StringField('Name', [
        validators.Length(min=3, max=50),
        validators.DataRequired()
    ])
    email = StringField('Email', [
        validators.Length(min=6, max=50),
        validators.Email(),
        validators.DataRequired(),
        validate_email_domain
    ])
    password = PasswordField('Password', [
        validators.DataRequired(),
        validators.Length(min=8),
        validators.Regexp(r'(?=.*\d)(?=.*[a-z])(?=.*[A-Z])', 
            message="La contraseña debe contener al menos una letra mayúscula, una minúscula y un número")
    ])

class LoginForm(Form):
    email = StringField('Email', [
        validators.Email(),
        validators.DataRequired()
    ])
    password = PasswordField('Password', [
        validators.DataRequired()
    ])