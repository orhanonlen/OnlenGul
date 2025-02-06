const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  // Mevcut assetExts listesine 'txt' ekleyin
  config.resolver.assetExts = [...config.resolver.assetExts, 'txt'];
  return config;
})();
