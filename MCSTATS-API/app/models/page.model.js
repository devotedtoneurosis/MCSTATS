module.exports = (sequelize, Sequelize) => {
  const Page = sequelize.define("pages", {
	url: {
      type: Sequelize.STRING(255)
    },
	date: {
      type: Sequelize.DATE
    },
  title: {
      type: Sequelize.STRING(255)
    },
  preview: {
      type: Sequelize.STRING(1000)
    },
  weight: {
      type: Sequelize.INTEGER
    }
  });

  return Page;
};