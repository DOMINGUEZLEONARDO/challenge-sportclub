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
    allowed_domains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com']
    domain = email.split('@')[1] if '@' in email else ''
    if domain not in allowed_domains:
        raise ValidationError(f'Dominio no permitido. Use uno de: {", ".join(allowed_domains)}')