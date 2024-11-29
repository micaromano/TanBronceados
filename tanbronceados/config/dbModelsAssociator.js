// Used to associate models with each other
module.exports = (models) => {
  Object.keys(models).forEach((model) => {
    if (models[model].associate) {
      models[model].associate(models);
    }
  });
}