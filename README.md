# apollo-resolver-gcs

[![version](https://img.shields.io/npm/v/apollo-resolver-gcs.svg?style=flat-square)][npm]
[![license](https://img.shields.io/npm/l/apollo-resolver-gcs.svg?style=flat-square)][npm]
[![build](https://img.shields.io/circleci/project/github/metabolize/apollo-resolver-gcs.svg?style=flat-square)][build]
[![code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)][prettier]

[npm]: https://npmjs.com/apollo-resolver-gcs/
[build]: https://circleci.com/gh/metabolize/apollo-resolver-gcs/tree/master
[prettier]: https://prettier.io/

A resolver function for [Apollo Server][] which loads serialized data from
Google Cloud Storage.

This is intended for loading static data backed by S3 but may be useful for
other functions as well.

There is a companion library [apollo-resolver-fs][] suitable for local testing.

Based on the example server in the Apollo Server 2 [Getting Started][] guide.

[apollo server]: https://www.apollographql.com/docs/apollo-server/
[apollo-resolver-fs]: https://github.com/metabolize/apollo-resolver-fs
[getting started]: https://www.apollographql.com/docs/apollo-server/getting-started.html

## Usage

```js
const { ApolloServer } = require('apollo-server')
const { createResolver } = require('apollo-resolver-gcs')

const typeDefs = ...

const getBook = createResolver({
  projectId: 'sandbox-123545',
  bucketName: 'all-my-books',
  argsToKey: ({ slug }) => `${slug}.json`,
})

const resolvers = {
  Query: {
    getBook,
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

await server.listen()
```

In this example, `getBook(slug: "harry-potter")` returns the deserialized
contents of `gcs://all-my-books/harry-potter.json`.

## Authentication

Follow the [Google Cloud Storage quickstart][quickstart]. In particular, you
must [set up authentication][auth] using `gcloud auth login` and
`gcloud auth application-default login`, or using a service account and
setting the `GOOGLE_APPLICATION_CREDENTIALS` access variable.

[quickstart]: https://github.com/googleapis/nodejs-storage#quickstart
[auth]: https://cloud.google.com/docs/authentication/getting-started

## Running the example server

1. Designate a bucket for the example server.
2. Copy `example.env` to `.env` and set the relevant variables.
3. Run `npm run load-server-fixtures` to load the fixtures into the bucket.
4. Run `npm start` to start the server.
5. Open `https://localhost:4000/`. You should see the GraphQL Playground
   explorer tool.
6. Run a query:

```gql
{
  getBook(slug: "harry-potter") {
    title
    author
  }
}
```

You should see the result:

```json
{
  "data": {
    "getBook": {
      "title": "Harry Potter and the Chamber of Secrets",
      "author": "J.K. Rowling"
    }
  }
}
```

## Running the tests

1. Designate a bucket for the example server.
2. Copy `example.env` to `.env` and set the relevant variables.
3. Run `npm test`.

## License

This project is licensed under the MIT license.
