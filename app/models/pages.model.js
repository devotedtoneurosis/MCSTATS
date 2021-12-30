module.exports = (sequelize, Sequelize) => {
  const Pages = sequelize.define("pages", {
	url: {
      type: Sequelize.STRING(2500)
    },
	date: {
      type: Sequelize.DATE
    },
    title: {
      type: Sequelize.STRING(2500)
    },
    preview: {
      type: Sequelize.STRING(2500)
    },
    weight: {
      type: Sequelize.INTEGER
    }
  });

  return Pages;
};
