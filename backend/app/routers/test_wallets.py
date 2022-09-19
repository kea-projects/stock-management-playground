from fastapi.testclient import TestClient

from ..main import app

client = TestClient(app)


# def test_read_wallets():
#     response = client.get("/wallets/")
#     assert response.status_code == 200
#     assert response.json() == {"response": "WALLETS !!!"}

# We need to look into how to make tests work with
# beanie and how to mock a database.
