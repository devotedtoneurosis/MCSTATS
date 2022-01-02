module.exports = (sequelize, Sequelize) => {
    const Page = sequelize.define("stats", {
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
  
    return Page;
  };