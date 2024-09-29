# Description

V Gomap back-end & database repository.

Swagger: API_ENDPOINT/api

## Google Auth service

mail: vgomap.vientruong@gmail.com

pass: v--q--l--v--

## Facebook Auth service

mail: vgomap.vientruong@gmail.com

pass: d----7-

## Installation (Development mode)

### 1. Create and add environment variables in .env.dev

### 2. Init database:

You can set up your database manually, then configure the database information in the .env

If you want to start your local postgreSql database, install Docker first and run:

```bash
$ docker-compose up -d db
```

### 3. Install dependencies

```bash
$ yarn install
```

### 4. Run migration

```bash
# development
$ yarn db:migrate:dev
```

### 5. Apply change to prisma client

You need to run this command right after running migration to update prisma client. If it fails, delete the folder node_modules/.prisma/client and try again.

```bash
# development
$ yarn prisma:generate
```

### 6. Run the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Using docker-compose

Make sure your docker is running

### 1. Create .env file for production build

### 2. Run docker-compose to build & run the containers for database and server

```
docker-compose up -d
```
