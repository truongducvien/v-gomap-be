## Description

V Gomap back-end & database repository.

Swagger: API_ENDPOINT/api

## Google Auth service

mail: vgomap.vientruong@gmail.com

pass: v--q--l--v--

## Facebook Auth service

mail: vgomap.vientruong@gmail.com

pass: d----7-

## Installation (Development mode)

1. Create and add environment variables in .env.dev
2. Init database: if you want to start your local postgreSql database, install Docker first

```bash
$ yarn db:init:dev
```

3. Install dependencies

```bash
$ yarn install
```

## Run migration

```bash
# development
$ yarn db:migrate:dev
```

## Apply change to prisma client

You need to run this command right after running migration to update prisma client. If it fails, delete the folder node_modules/.prisma/client and try again.

```bash
# development
$ yarn prisma:generate
```

## Run the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## License
