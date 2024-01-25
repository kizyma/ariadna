// index.js
import weaviate from 'weaviate-ts-client';
import { schemaCfg } from './config.js'; // Use named import

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

// step 1
const schemaQry = await client.schema.getter().do();
console.log(schemaQry);

// step 2 - something like a create/migrate command in an ordinary database
// perform once to create, or once schema is changed
await client.schema
    .classCreator()
    .withClass(schemaCfg)
    .do();
