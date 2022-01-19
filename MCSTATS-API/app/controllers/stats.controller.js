const db = require("../models");
const Stat = db.stats;
const Op = db.Sequelize.Op;

// Retrieve all Stats from the database.
exports.findAll  = (req, res) => {
  Stat.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Stats."
      });
    });
};


// Find all published SocialCriterias
exports.findByProjectId = (req, res) => {
  const id = req.params.id;

  Stat.findAll({ where: { project_id: id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SocialCriterias."
      });
    });
};

