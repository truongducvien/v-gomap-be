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

You need to run this command right after running migration to update prisma client. If it fails, delete the folder node_modules/.prisma/client and try again.

```bash
# development
$ yarn prisma:generate
```

## License
