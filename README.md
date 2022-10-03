# Stock Management Playground

## Backend

### Requirements

- Python3
- Poetry
- MongoDB database

### Setup

- Use `cd backend` to navigate to the [backend](./backend/) directory.
- Run `poetry shell` & `poetry install` to create an environment with the required dependencies.
- Create a `.env` file in the [backend](./backend/) folder and add the environment variables as described in the `.env-template` file from the same folder.
> ***Note***: You will also need to create a `.env.test` with the same structure in order to run the tests.
- Run `uvicorn app.main:app --reload` to run the app.

### Documentation

- Once the application is running, the **SwaggerUI** documentation can be accessed by going to the `/docs` endpoint.

- Additionally, in the [docs](./docs/) folder can be found the [postman collection](./docs/postman/stock-management-playground.postman_collection.json) containing sample data for all of the implemented endpoints.
