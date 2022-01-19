module.exports = (sequelize, Sequelize) => {
  const Subreddit = sequelize.define("subreddit", {
  subreddit_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
	project_id: {
      type: Sequelize.INTEGER
    },
  name: {
      type: Sequelize.STRING(1024)
    }
  });

  return Subreddit;
};