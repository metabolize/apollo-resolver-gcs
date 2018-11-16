# apollo-resolver-gcs

A resolver function for [Apollo Server][] which loads serialized data from
Google Cloud Storage.

This is intended for loading static data backed by S3 but may be useful for
other functions as well.

Based on the example server in the Apollo Server 2 [Getting Started][] guide.

[apollo server]: https://www.apollographql.com/docs/apollo-server/
[getting started]: https://www.apollographql.com/docs/apollo-server/getting-started.html

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
