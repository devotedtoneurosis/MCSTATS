module.exports = (sequelize, Sequelize) => {
  const Projects = sequelize.define("projects", {
  project_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
	project_name: {
      type: Sequelize.STRING(1024)
    },
  game_id: {
      type: Sequelize.STRING(1024)
    }
  });

  return Projects;
};