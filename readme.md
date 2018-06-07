# ApolloLinkFormData

[![devDependencies Status](https://david-dm.org/octet-stream/apollo-link-form-data/dev-status.svg)](https://david-dm.org/octet-stream/apollo-link-form-data)
[![devDependencies Status](https://david-dm.org/octet-stream/apollo-link-form-data/dev-status.svg)](https://david-dm.org/octet-stream/apollo-link-form-data?type=dev)
[![Build Status](https://travis-ci.org/octet-stream/apollo-link-form-data.svg?branch=master)](https://travis-ci.org/octet-stream/apollo-link-form-data)
[![Code Coverage](https://codecov.io/github/octet-stream/apollo-link-form-data/coverage.svg?branch=master)](https://codecov.io/github/octet-stream/apollo-link-form-data?branch=master)

🚧 Project on early stage. I still wotking on documentation and tests.

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
