## Description

V Gomap back-end repository.

Swagger: API_ENDPOINT/api

## Add environment variables

## Database

PostgreSQL: View & manage with [Neon](https://console.neon.tech/app/projects)

Account: Github truongducvien

## Google Auth service

mail: vgomap.vientruong@gmail.com

pass: v--q--l--v--

## Facebook Auth service

mail: vgomap.vientruong@gmail.com

pass: d----7-

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Running migration

```bash
# development
$ yarn db:migrate:dev
```

## Apply change to prisma client

You need to run this comment right after running migration to update prisma client

```bash
# development
$ yarn prisma:generate
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License
