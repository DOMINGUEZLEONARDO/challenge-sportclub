from flask import Flask
from flask_jwt_extended import JWTManager
from pymongo import MongoClient, ASCENDING
from config import Config
from app.routes.auth_routes import auth_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    app.config.from_object(Config)
    app.config["MONGO_URI"] = "mongodb://localhost:27017/sportClub"

    
    JWTManager(app)

    client = MongoClient(app.config["MONGO_URI"])
    db = client.get_database()

    try:
        db.users.create_index([("email", ASCENDING)], unique=True)
        app.logger.info("Índices de MongoDB creados exitosamente")
    except Exception as e:
        app.logger.error(f"Error al crear índices en MongoDB: {str(e)}")

    app.db = db

    
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    return app
