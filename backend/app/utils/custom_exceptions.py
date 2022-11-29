from fastapi import HTTPException, status

# --- Auth Exceptions --


bad_credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect username or password",
    headers={"WWW-Authenticate": "Bearer"},
)

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

expired_token_exception = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail="Token has expired.",
)

insecure_password_exception = HTTPException(
    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
    detail="Password must contain a minimum of eight characters, at" +
    " least one uppercase letter, one lowercase letter, one " +
    "number and one special character"
)


# --- User Exceptions --


user_already_exists_exception = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="Username already taken."
)

user_not_found_exception = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="User not found!"
)


# --- Wallet Exceptions ---


wallet_not_found_exception = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="Wallet not found!"
)

# --- Stock Exceptions ---

stock_not_found_exception = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="Stock not found!"
)

# --- Stock Entry Exceptions ---

stock_entry_not_found_exception = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="Stock Entry not found!"
)


# --- Finnhub Exceptions ---

finnhub_too_many_requests_exception = HTTPException(
    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
    detail="Too many requests!"
)
