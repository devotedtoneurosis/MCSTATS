module.exports = (sequelize, Sequelize) => {
  const SocialCriteria = sequelize.define("social_criterias", {
  criteria_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
	project_id: {
      type: Sequelize.INTEGER
    },
  keyword: {
      type: Sequelize.STRING(1024)
    }
  });

  return SocialCriteria;
};