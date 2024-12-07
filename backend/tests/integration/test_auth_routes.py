import json
import pytest
from flask_jwt_extended import create_access_token

def test_register_success(client):
    response = client.post('/api/auth/register', json={
        "name": "User Name",
        "email": "user@gmail.com",
        "password": "TestPass123!"
    })
    assert response.status_code == 201
    data = json.loads(response.data)
    assert "message" in data
    assert data["user"]["email"] == "user@gmail.com"

def test_register_duplicate_email(client):
    
    client.post('/api/auth/register', json={
        "name": "User Name",
        "email": "user@gmail.com",
        "password": "TestPass123!"
    })
    
    
    response = client.post('/api/auth/register', json={
        "name": "Another User",
        "email": "user@gmail.com",
        "password": "TestPass123!"
    })
    assert response.status_code == 400
    assert b"Email ya registrado" in response.data

def test_login_success(client):

    client.post('/api/auth/register', json={
        "name": "User NAme",
        "email": "user@gmail.com",
        "password": "TestPass123!"
    })
    
    response = client.post('/api/auth/login', json={
        "email": "user@gmail.com",
        "password": "TestPass123!"
    })
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "token" in data

def test_profile_access(client, app):

    client.post('/api/auth/register', json={
        "name": "User Name",
        "email": "user@gmail.com",
        "password": "TestPass123!"
    })
    
    
    with app.app_context():
        access_token = create_access_token(identity="user@gmail.com")
        
    headers = {"Authorization": f"Bearer {access_token}"}
    response = client.get('/api/auth/profile', headers=headers)
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["profile"]["email"] == "user@gmail.com"