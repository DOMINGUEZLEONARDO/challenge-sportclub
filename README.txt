# SportClub API

Esta es una aplicación web para gestionar usuarios. Permite a los usuarios registrarse, iniciar sesión y actualizar su perfil. La aplicación está construida con React en el frontend y Python en el backend.

## Tabla de Contenidos

- [Características]
- [Tecnologías Utilizadas]
- [Instalación]
- [Uso]
- [Pruebas](#pruebas)

## Características

- Registro de nuevos usuarios.
- Inicio de sesión con autenticación JWT.
- Actualización de perfil de usuario.
- Validación de contraseñas y correos electrónicos.
- Interfaz de usuario amigable construida con Material-UI.

## Tecnologías Utilizadas

- **Frontend**: React, Material-UI, Axios
- **Backend**: Flask, Flask-JWT-Extended, PyMongo, Flask-CORS
- **Base de Datos**: MongoDB
- **Pruebas**: Jest para el frontend, Pytest para el backend

## Instalación

### Requisitos Previos

- Node.js (v14 o superior)
- Python (v3.7 o superior)
- MongoDB

### Clonar el Repositorio

https://github.com/DOMINGUEZLEONARDO/challenge-sportclub


## Uso

### Configuración del Backend

1. Navega a la carpeta del backend:


2. Instala las dependencias: pip install -r requirements.txt

3. Inicia el servidor:  python main.py



### Configuración del Frontend

1. Navega a la carpeta del frontend:


2. Instala las dependencias: npm install


3. Inicia la aplicación: npm start

La aplicación estará disponible en `http://localhost:3000`.


## Pruebas

Para ejecutar las pruebas del frontend, navega a la carpeta del frontend y ejecuta:


npm test


Para ejecutar las pruebas del backend, navega a la carpeta del backend y ejecuta:

pytest
