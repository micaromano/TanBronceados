module.exports = (sequelize) => {
  async function sync() {
    // Sincroniza los modelos con la base de datos. force: true, dropea las tablas si existen y las vuelve a crear
    await sequelize.sync({ force: false });
  }
}
