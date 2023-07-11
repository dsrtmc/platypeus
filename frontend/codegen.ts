import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../Server/schema.graphql",
  documents: "graphql/src/**/*.graphql",
  generates: {
    "graphql/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
