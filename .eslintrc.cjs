module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "next/core-web-vitals", // Regras recomendadas pelo Next.js
    "plugin:@typescript-eslint/recommended", // Regras recomendadas para TypeScript
    "plugin:import/recommended", // Regras recomendadas do eslint-plugin-import
    "plugin:import/typescript", // Suporte a TypeScript no eslint-plugin-import
    "prettier", // Integração com Prettier para formatação automática
  ],
  plugins: ["@typescript-eslint", "import", "prettier"],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // Tenta resolver arquivos de definição de tipos
        project: "./tsconfig.json",
      },
      node: {
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".json",
          ".mjs",
          ".cjs",
          ".md",
          ".yml",
        ],
      },
    },
  },
  rules: {
    // Regras gerais
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Evita erros para variáveis não usadas que começam com "_"
    "@typescript-eslint/explicit-module-boundary-types": "off", // Não exige tipagem explícita em funções exportadas
    "@typescript-eslint/no-explicit-any": "warn", // Evita o uso excessivo de `any`

    // Regras do eslint-plugin-import
    "import/no-unresolved": "error", // Garante que os imports sejam resolvidos corretamente
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "import/newline-after-import": "error", // Garante uma linha em branco após imports
    "import/no-duplicates": "error", // Evita imports duplicados
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/*.test.ts", "**/*.test.tsx", "**/jest.setup.ts"],
      },
    ],
  },
  ignorePatterns: ["node_modules/", "dist/", ".next/", "out/"], // Ignora diretórios desnecessários
};

// https://github.com/import-js/eslint-plugin-import#resolvers
//npm install eslint-plugin-import --save-dev
