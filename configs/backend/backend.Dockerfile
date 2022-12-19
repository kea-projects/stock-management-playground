FROM python:3.10-slim-bullseye

EXPOSE 8000

# Install poetry
RUN pip install poetry

WORKDIR /service

ENV PYTHONUNBUFFERED=1

# RUN apt-get update && apt-get install libpq-dev python3-dev gcc -y

COPY ./backend/poetry.lock /service/
COPY ./backend/pyproject.toml /service/

RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction --no-root

COPY ./backend /service

ENTRYPOINT [ "uvicorn", "app.main:app", "--host", "0.0.0.0" ]