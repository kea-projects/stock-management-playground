# Build
FROM node:alpine AS build
WORKDIR /build

COPY ./frontend/package.json            package.json
COPY ./frontend/package-lock.json       package-lock.json

RUN npm ci

ARG REACT_APP_API_URL
ARG REACT_APP_SENTRY_DSN

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_SENTRY_DSN=$REACT_APP_SENTRY_DSN

COPY ./frontend/.prettierrc.json        .prettierrc.json 
COPY ./frontend/tsconfig.json           tsconfig.json

COPY ./frontend/public                  public/
COPY ./frontend/src                     src/

RUN npm run build

# Serve
FROM node:alpine

WORKDIR /deploy

COPY --from=build /build/build/ ./build

RUN npm install -g serve

EXPOSE 3000

CMD [ "serve", "-p", "3000", "-s", "build" ]
