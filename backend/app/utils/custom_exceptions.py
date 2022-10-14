from fastapi import HTTPException, status

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

user_already_exists_exception = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="Username already taken."
)
