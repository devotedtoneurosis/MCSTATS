module.exports = (sequelize, Sequelize) => {
    const Stat = sequelize.define("stats", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    project_id: {
        type: Sequelize.INTEGER
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