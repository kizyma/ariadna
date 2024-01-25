// index.js
import weaviate from 'weaviate-ts-client';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path'
import { schemaCfg } from './config.js';


const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

// step 1
const schemaQry = await client.schema.getter().do();
// console.log(schemaQry);

// step 2 - something like a create/migrate command in an ordinary database
// perform once to create, or once schema is changed
// await client.schema
//     .classCreator()
//     .withClass(schemaCfg)
//     .do();

// step 3 - upload images
const imgFolder = './img';

const files = readdirSync(imgFolder);

for (const file of files) {
    const filePath = join(imgFolder, file);

    // Read the file content
    const img = readFileSync(filePath);

    // Convert the image content to base64
    const b64 = Buffer.from(img).toString('base64');

    // Use the filename (excluding extension) as text
    const fileNameWithoutExtension = file.split('.')[0];

    // Create Image instance in collection for each image
    await client.data.creator()
        .withClassName('Image')
        .withProperties({
            image: b64,
            text: fileNameWithoutExtension,
        })
        .do();
}