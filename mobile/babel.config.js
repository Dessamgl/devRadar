module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

//converte o codigo javascript mais recente para adequar-se a versao de onde estamos reproduzindo
