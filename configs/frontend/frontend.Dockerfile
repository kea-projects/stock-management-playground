# Build
FROM node:alpine AS build
WORKDIR /build

COPY ./frontend/package.json            package.json
COPY ./frontend/pnpm-lock.yaml          pnpm-lock.yaml

RUN apk update && apk add --no-cache libc6-compat

RUN corepack enable && corepack prepare pnpm@7.4.1 --activate 

RUN pnpm i

RUN pnpm i @babel/core @babel/plugin-transform-react-jsx @testing-library/dom @babel/plugin-syntax-flow @chakra-ui/system prop-types typescript

ARG REACT_APP_API_URL

ENV ARG REACT_APP_API_URL=$ARG REACT_APP_API_URL

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
