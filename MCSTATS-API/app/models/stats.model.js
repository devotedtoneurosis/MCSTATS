module.exports = (sequelize, Sequelize) => {
    const Stat = sequelize.define("stats", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    timestamp: {
        type: Sequelize.DATE
      },
    player_count: {
        type: Sequelize.INTEGER
      }
    });
  
    return Stat;
  };