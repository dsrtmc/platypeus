const fs = require("fs");
const https = require("https");
require("dotenv").config({ path: "./.env.local" });

const possibleTypesIntrospectionQuery = `
  {
    __schema {
      types {
        kind
        name
        possibleTypes {
          name
        }
      }
    }
  }
`;

// TODO: only in development, don't do that in prod
// we should move it to the build script, and in theory we only build for https, so we'll probably remove it
const agent = new https.Agent({ rejectUnauthorized: false });

fetch(process.env["NEXT_PUBLIC_API_URL"], {
  agent,
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    variables: {},
    query: possibleTypesIntrospectionQuery,
  }),
})
  .then((result) => result.json())
  .then((result) => {
    const possibleTypes = {};

    result.data.__schema.types.forEach((supertype) => {
      if ("possibleTypes" in supertype && supertype.possibleTypes) {
        possibleTypes[supertype.name] = supertype.possibleTypes.map((subtype) => subtype.name);
      }
    });

    fs.writeFile("./possibleTypes.json", JSON.stringify(possibleTypes), (err) => {
      if (err) {
        console.error("Error writing `possibleTypes.json`", err);
      } else {
        console.log("Fragment types successfully extracted.");
      }
    });
  });
