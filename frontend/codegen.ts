import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // TODO: surely there is a better way to link to the schema? once we deploy i don't think we're gonna be able to do it like that
  schema: "../Server/schema.graphql",
  documents: ["graphql/src/**/*.graphql", "app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  generates: {
    // TODO: i like doing "__generated__" more i think
    "graphql/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
