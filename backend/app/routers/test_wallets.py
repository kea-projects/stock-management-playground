from fastapi.testclient import TestClient

from ..main import app

client = TestClient(app)


def test_read_wallets():
    response = client.get("/wallets/")
    assert response.status_code == 200
    assert response.json() == {"response": "WALLETS !!!"}

