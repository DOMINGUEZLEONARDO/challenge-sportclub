from datetime import datetime
from flask_bcrypt import generate_password_hash
import re

class User:
    @staticmethod
    def is_valid_email(email):
        """Validación adicional de email"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(pattern, email))

    @staticmethod
    def is_valid_password(password):
        """Validación adicional de contraseña"""
        if len(password) < 8:
            return False
        if not re.search(r'[A-Z]', password):
            return False
        if not re.search(r'[a-z]', password):
            return False
        if not re.search(r'\d', password):
            return False
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            return False
        return True

    def __init__(self, name, email, password, role="user"):
        if not self.is_valid_email(email):
            raise ValueError("Email inválido")
        if not self.is_valid_password(password):
            raise ValueError("Contraseña no cumple con los requisitos de seguridad")
            
        self.name = name
        self.email = email.lower()
        self.password = generate_password_hash(password).decode('utf-8')
        self.role = role
        self.created_at = datetime.utcnow()

    def to_dict(self):
        return {
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "role": self.role,
            "created_at": self.created_at
        }
