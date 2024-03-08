const fs = require("fs");
const https = require("https");
const fetch = require("cross-fetch");

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

// TODO: only in development, never do that in prod
const agent = new https.Agent({ rejectUnauthorized: false });

// TODO: .env
fetch(`https://localhost:7218/graphql`, {
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
