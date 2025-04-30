This is a [Next.js](https://nextjs.org) project bootstrapped with [
`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

This will first initialize the database and then start the Next.js development server.
The database will be initialized with the necessary tables and data. See `./database/init.sql` for the SQL commands used
to initialize the database.

Open [http://localhost:3000](http://localhost:3000) with your browser to see your app.

## Technologies Used

- [Next.js](https://nextjs.org) - A React framework for building server-side rendered applications.
- [TypeScript](https://www.typescriptlang.org/) - A superset of JavaScript that adds static types.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [PostgreSQL](https://www.postgresql.org/) - An open-source relational database management system.

## Local development

- Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) if you haven't
  already.
- Clone the repository:

```bash
git clone
cd <repository-name>
```

- Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database-name>
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<database-name>
```

- Replace `<username>`, `<password>`, and `<database-name>` with your PostgreSQL credentials.

### Copyright

This project is created to explore the capabilities of Next.js and PostgreSQL. It is not intended for production use. Copyright (c) 2023 [Rusås Design](https://rusåsdesign.no). All rights reserved.
