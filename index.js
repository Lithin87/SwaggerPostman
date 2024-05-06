const Converter = require('openapi-to-postmanv2')
const fs = require('fs')
const path = require('path');


var conversionOptions = {
  schemaFaker: true,
  requestNameSource: 'fallback'
};

const resourcesDir = path.join(__dirname, 'resources');
const outputDir = path.join(resourcesDir, 'output');

const outFilePath = path.join(outputDir, 'postman_collection.json');
const inFilePath = path.join(resourcesDir, 'petstore.yaml');

openapiData = fs.readFileSync(inFilePath, {encoding: 'UTF8'});

Converter.convert({ type: 'string', data: openapiData }, conversionOptions, (err, result) => {
    if (err) {
      console.error('Error during conversion:', err);
    } else {
      // Conversion successful
      var postmanCollection = result.output[0].data;
      console.log('Converted Postman collection:', JSON.stringify(postmanCollection, null, 2));
      
      // Save the Postman collection to a file
      fs.writeFileSync(outFilePath, JSON.stringify(postmanCollection, null, 2));
    }
  });