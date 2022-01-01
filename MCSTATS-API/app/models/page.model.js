module.exports = (sequelize, Sequelize) => {
  const Page = sequelize.define("pages", {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
	url: {
      type: Sequelize.STRING(1024)
    },
	date: {
      type: Sequelize.DATE
    },
  title: {
      type: Sequelize.STRING(1024)
    },
  preview: {
      type: Sequelize.STRING(5000)
    },
  weight: {
      type: Sequelize.INTEGER
    }
  });

  return Page;
};