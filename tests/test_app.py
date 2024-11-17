import pytest
from app import app
import io
import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    rv = client.get('/health')
    assert rv.status_code == 200
    assert b'healthy' in rv.data

def test_generate_document_no_template(client):
    rv = client.post('/generate-document')
    assert rv.status_code == 400
    assert b'No template file provided' in rv.data
