# remix-hr-management
a simple hr management web application to learn remix.run

## prerequisites

- `docker` and `docker-compose`
- `node` and `npm`

## setup

1. `npm i` to install all dependencies
2. `npm run db:up` to start a postgres container and to apply the db dump
2. `npm run prisma:generate` to generate the types and the prisma client
2. `npm run create-test-data` to create the test data

## start in development mode

- `npm run dev` to bring up the dev server

## start in production mode

1. `npm run build` to build for production
2. `npm start` to start the server