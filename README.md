## YelpCamp using Next.js

This is a refactored version of the Web Developer Bootcamp capstone project from [Colt Steele's Udemy course](https://www.udemy.com/course/the-web-developer-bootcamp) using [Next.js](https://nextjs.org/) instead of Vanilla Javascript.

You can check a deployed version of this app _insert vercel link here_

## Getting Started

First, clone the repository and run the following command.

```bash
npm install

```

## Populating database

For this project we used a MongoDB atlas instance so be sure to include a `MONGO_URI` in your `.env` file.

To populate the database with dummy data run the following command

```bash
npm run setup

```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
