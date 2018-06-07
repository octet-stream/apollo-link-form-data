# ApolloLinkFormData

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

And put this fetcher to options manually:

```
import fetch from "node-fetch"

import {createFormDataLink} from "apollo-link-form-data"

const link = createFormDataLink({fetch})
```
