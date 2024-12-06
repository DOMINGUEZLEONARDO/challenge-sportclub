from flask import jsonify
from app import create_app
from flask import Flask
from flask_jwt_extended import JWTManager


app = create_app()

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the API!"})


if __name__ == "__main__":
    app.run(debug=True)

