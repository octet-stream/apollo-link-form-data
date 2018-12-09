# ApolloLinkFormData

[![dependencies Status](https://david-dm.org/octet-stream/apollo-link-form-data/status.svg)](https://david-dm.org/octet-stream/apollo-link-form-data)
[![devDependencies Status](https://david-dm.org/octet-stream/apollo-link-form-data/dev-status.svg)](https://david-dm.org/octet-stream/apollo-link-form-data?type=dev)
[![Build Status](https://travis-ci.org/octet-stream/apollo-link-form-data.svg?branch=master)](https://travis-ci.org/octet-stream/apollo-link-form-data)
[![Code Coverage](https://codecov.io/github/octet-stream/apollo-link-form-data/coverage.svg?branch=master)](https://codecov.io/github/octet-stream/apollo-link-form-data?branch=master)

🚧 Project on early stage. I am still wotking on documentation and tests.

## Installation

You can install this package from npm:

```
npm install apollo-link-form-data graphql
```

Or with yarn:

```sh
yarn add apollo-link-form-data graphql
```

For Node.js you also need to install following dependencies:

```sh
# Or any other fetch-compatible library instead of node-fetch
yarn add node-fetch formdata-node
```

And add this `fetch` library to options manually:

```js
import fetch from "node-fetch"

import {createFormDataLink} from "apollo-link-form-data"

const link = createFormDataLink({fetch})
```

Another thing I have to mention, is that ApolloLinkFormData uses `@octetstream/object-to-form-data` package under the hood
to convert request payload to FormData which means that your data will be sent to server in spetial format.
For more info, read the API section of then-busboy documentation: [then-busboy#bracket-notation](https://github.com/octet-stream/then-busboy#bracket-notation)

Of course, it doesn't mean that you have to use then-busboy on your server to process `multipart/form-data`
requests, but it must support mentioned format if you want to get usefull data out-of-the-box.

## Usage

Import and initialize with just two lines:

```js
import {createFormDataLink} from "apollo-link-form-data"

const link = createFormDataLink({uri: "https://api.example.com/graphql"})
```

Usage with Apollo Client:

```js
import ApolloClient from "apollo-client"

import {InMemoryCache} from "apollo-cache-in-memory"
import {createFormDataLink} from "apollo-link-form-data"

const link = createFormDataLink({
  uri: "https://api.example.com/graphql"
})

const cache = new InMemoryCache()

const client = ApolloClient({link, cache})
```

## API

### `createFormDataLink(options) -> ApolloLinkFormData`

Create and instance of ApolloLinkFormData with given options.

  - **{object}** options.serialize – defines serialization options for @octetstream/object-to-form-data and FormData link
  - **{boolean}** [options.serialize.force = false] – if `true`, request payload will be always converted to FormData.
    Defaults to `false` which means that payload will be converted to FormData only when it contains at least one File.
  - **{boolean}** [options.serialize.strict = false] – if `true`, all falsy booleans will be ignored. (See [#1](https://github.com/octet-stream/object-to-form-data/pull/1#issuecomment-377878531) PR in `@octetstream/object-to-form-data` for mode info)

**Another available options you can find in [ApolloHttpLink documentation](https://www.apollographql.com/docs/link/links/http.html)**.

## Related links

* [then-busboy](https://github.com/octet-stream/then-busboy) is a promise-based wrapper around Busboy. Process multipart/form-data content and returns it as a single object. Will be helpful to handle your data on the server-side applications.
* [formdata-node](https://github.com/octet-stream/form-data) is an async-iterator and steam based [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) implementation for Node.js
* [@octetstream/object-to-form-data](https://github.com/octet-stream/object-to-form-data) converts JavaScript object to FormData.
