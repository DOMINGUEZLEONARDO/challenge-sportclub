import pytest
from app import create_app
from mongomock import MongoClient

@pytest.fixture
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
        "MONGO_URI": "mongodb://testdb:27017/test_db"
    })
    
    app.db = MongoClient()['test_db']
    
    return app

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def runner(app):
    return app.test_cli_runner()