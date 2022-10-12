import pytest

from .validators import matches_email, matches_password, matches_pattern

# Test Data
test_pattern = r"^test$"
test_pattern_string = "test"
test_pattern_string_bad = "no_test"

test_email = "test@email.com"
test_email_no_domain = "testemail.com"
test_email_no_dot = "test@emailcom"
test_email_no_domain_dot = "testemailcom"

test_password = "testPassword123!"
test_password_not_enough_characters = "pAss1!"
test_password_no_uppercase = "testpassword123!"
test_password_no_lowercase = "TESTPASSWORD123!"
test_password_no_numbers = "testPassword!"
test_password_no_symbols = "testPassword123"


@pytest.mark.asyncio
async def test_matches_pattern():
    response = matches_pattern(regex=test_pattern, string=test_pattern_string)

    assert response is True


@pytest.mark.asyncio
async def test_matches_pattern_no_match():
    response = matches_pattern(
        regex=test_pattern,
        string=test_pattern_string_bad
    )

    assert response is False


@pytest.mark.asyncio
async def test_matches_email():
    response = matches_email(test_email)

    assert response is True


@pytest.mark.asyncio
async def test_matches_email_no_domain():
    response = matches_email(test_email_no_domain)

    assert response is False


@pytest.mark.asyncio
async def test_matches_email_no_dot():
    response = matches_email(test_email_no_dot)

    assert response is False


@pytest.mark.asyncio
async def test_matches_email_no_domain_dot():
    response = matches_email(test_email_no_domain_dot)

    assert response is False


@pytest.mark.asyncio
async def test_matches_password():
    response = matches_password(test_password)

    assert response is True


@pytest.mark.asyncio
async def test_matches_password_not_enough_characters():
    response = matches_password(test_password_not_enough_characters)

    assert response is False


@pytest.mark.asyncio
async def test_matches_password_no_uppercase():
    response = matches_password(test_password_no_uppercase)

    assert response is False


@pytest.mark.asyncio
async def test_matches_password_no_lowercase():
    response = matches_password(test_password_no_lowercase)

    assert response is False


@pytest.mark.asyncio
async def test_matches_password_no_numbers():
    response = matches_password(test_password_no_numbers)

    assert response is False


@pytest.mark.asyncio
async def test_matches_password_no_symbols():
    response = matches_password(test_password_no_symbols)

    assert response is False
