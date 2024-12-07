import re
from wtforms.validators import ValidationError

def validate_password(form, field):
    password = field.data
    if len(password) < 8:
        raise ValidationError('La contraseña debe tener al menos 8 caracteres')
    if not re.search(r'[A-Z]', password):
        raise ValidationError('La contraseña debe contener al menos una mayúscula')
    if not re.search(r'[a-z]', password):
        raise ValidationError('La contraseña debe contener al menos una minúscula')
    if not re.search(r'\d', password):
        raise ValidationError('La contraseña debe contener al menos un número')
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        raise ValidationError('La contraseña debe contener al menos un carácter especial')

def validate_email_domain(form, field):
    email = field.data
    blacklisted_domains = ['mailinator.com', 'tempmail.com', '10minutemail.com']


    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_regex, email):
        raise ValidationError('Correo inválido. Ingrese un correo con formato válido.')


    domain = email.split('@')[-1]
    if domain in blacklisted_domains:
        raise ValidationError(f'Dominio "{domain}" no está permitido.')