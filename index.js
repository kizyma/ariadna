// index.js
import weaviate from 'weaviate-ts-client';
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path'
import { schemaCfg } from './config.js';

const imgFolder = './img';

function toBase64(filePath) {
    const img = readFileSync(filePath);
    return Buffer.from(img).toString('base64');
}

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
// const files = readdirSync(imgFolder);
//
// const batchProcess = files.map(async (imgFile) => {
//     // Convert the image content to base64
//     const b64 = toBase64(join(imgFolder, imgFile)); // Fix the path
//     // Create Image instance in collection for each image
//     await client.data.creator()
//         .withClassName('Image')
//         .withProperties({
//             image: b64,
//             text:  imgFile.split('.')[0],
//         })
//         .do();
// });
//
// await Promise.all(batchProcess);

//step 4 search images
const test = Buffer.from( readFileSync('./deathwatch_meme_test.jpeg') ).toString('base64');

const resImage = await client.graphql.get()
    .withClassName('Image')
    .withFields(['image'])
    .withNearImage({ image: test })
    .withLimit(1)
    .do();

// Write result to filesystem
const result = resImage.data.Get.Image[0].image;
writeFileSync('./result.jpg', result, 'base64');