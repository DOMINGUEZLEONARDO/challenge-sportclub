from flask import Blueprint, request, jsonify
from werkzeug.exceptions import BadRequest
from app.models.user_model import User
from flask import current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import check_password_hash, generate_password_hash
from bson import ObjectId
from wtforms import Form, StringField, PasswordField, validators
from app.utils.validators import validate_password, validate_email_domain
from app.forms import RegisterForm



auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        
        data = request.get_json()
        form = RegisterForm(data=data)
        
        if not form.validate():
            return jsonify({
                "error": "Datos inválidos",
                "details": form.errors
            }), 400

        
        if current_app.db.users.find_one({"email": form.email.data}):
            return jsonify({
                "error": "Email ya registrado",
                "field": "email"
            }), 400

        
        user = User(
            name=form.name.data,
            email=form.email.data,
            password=form.password.data
        )
        
        current_app.db.users.insert_one(user.to_dict())

        return jsonify({
            "message": "Usuario registrado exitosamente",
            "user": {
                "name": user.name,
                "email": user.email
            }
        }), 201

    except Exception as e:
        current_app.logger.error(f"Error en registro: {str(e)}")
        return jsonify({
            "error": "Error en el servidor",
            "message": str(e)
        }), 500

@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            raise BadRequest("Email y contraseña son requeridos.")

        user = current_app.db.users.find_one({"email": email})
        
        if not user or not check_password_hash(user["password"], password):
            return jsonify({"error": "Credenciales inválidas"}), 401

      
        access_token = create_access_token(identity=email)
        
        return jsonify({
            "message": "Login exitoso",
            "token": access_token
        }), 200

    except BadRequest as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Error en el servidor"}), 500

@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    try:
       
        current_user_email = get_jwt_identity()
        user = current_app.db.users.find_one(
            {"email": current_user_email},
            {"password": 0}  
        )

        if not user:
            return jsonify({"error": "Usuario no encontrado."}), 404

        user['_id'] = str(user['_id'])

        return jsonify({
            "profile": {
                "name": user["name"],
                "email": user["email"]
            }
        }), 200
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "Error en el servidor."}), 500

@auth_bp.route("/update", methods=["PUT"])
@jwt_required()
def update_profile():
    try:
   
        current_user_email = get_jwt_identity()
        data = request.json

        user = current_app.db.users.find_one({"email": current_user_email})
        if not user:
            return jsonify({"error": "Usuario no encontrado."}), 404

        updates = {}
        if "name" in data:
            updates["name"] = data["name"]
        if "password" in data:
            updates["password"] = generate_password_hash(data["password"]).decode('utf-8')

        if not updates:
            return jsonify({"error": "No se proporcionaron datos para actualizar."}), 400

        result = current_app.db.users.update_one(
            {"email": current_user_email},
            {"$set": updates}
        )

        if result.modified_count > 0:
            return jsonify({
                "message": "Perfil actualizado exitosamente",
                "updates": {k: v for k, v in updates.items() if k != "password"}
            }), 200
        else:
            return jsonify({"error": "No se pudo actualizar el perfil."}), 400

    except Exception as e:
        print(f"Error en update_profile: {str(e)}")  # Para debugging
        return jsonify({"error": "Error en el servidor"}), 500

