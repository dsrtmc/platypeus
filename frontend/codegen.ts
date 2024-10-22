import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // TODO: surely there is a better way to link to the schema?
  schema: "../Server/schema.graphql",
  documents: ["graphql/src/**/*.graphql", "app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  generates: {
    "graphql/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
