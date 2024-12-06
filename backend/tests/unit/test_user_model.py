import pytest
from app.models.user_model import User

def test_valid_user_creation():
    user = User(
        name="User Name",
        email="user@gmail.com",
        password="TestPass123!"
    )
    assert user.name == "User Name"
    assert user.email == "user@gmail.com"
    assert user.role == "user"

def test_invalid_email():
    with pytest.raises(ValueError, match="Email inválido"):
        User(
            name="User Name",
            email="invalid-email",
            password="TestPass123!"
        )

def test_invalid_password():
    with pytest.raises(ValueError, match="Contraseña no cumple con los requisitos"):
        User(
            name="User Name",
            email="user@gmail.com",
            password="weak"
        )

def test_user_to_dict():
    user = User(
        name="User Name",
        email="user@gmail.com",
        password="TestPass123!"
    )
    user_dict = user.to_dict()
    assert user_dict["name"] == "User Name"
    assert user_dict["email"] == "user@gmail.com"
    assert "password" in user_dict