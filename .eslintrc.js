module.exports = {
  settings: {
    react: {
      version: "detect", // Informa ao eslint-plugin-react para detectar a versão do React
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // Desativa o aviso para importar React
  },
};
