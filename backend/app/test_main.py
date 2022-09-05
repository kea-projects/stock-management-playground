from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)


def test_redirect_docs():
    response = client.get("/")
    assert response.status_code == 200


def test_():
    response = client.get("/incorrect-path")
    assert response.status_code == 200
    assert response.json() == {"message": "Requested path does not exist."}
