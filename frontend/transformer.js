const obfuscatingTransformer = require("react-native-obfuscating-transformer");

module.exports = obfuscatingTransformer({
  // ...outras opções...
  filter: (filename, source) => {
    return filename.startsWith("src");
  },
  // ...mais opções se necessário...
})
