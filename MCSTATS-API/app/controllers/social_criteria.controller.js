const db = require("../models");
const SocialCriteria = db.social_criteria;
const Op = db.Sequelize.Op;

// Create and Save a new SocialCriteria
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a SocialCriteria
  const socialcriteria = {
    keyword: req.body.title,
    project_id: req.body.description
  };

  // Save SocialCriteria in the database
  SocialCriteria.create(socialcriteria)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SocialCriteria."
      });
    });
};

// Retrieve all SocialCriteria from the database.
exports.findAll  = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  SocialCriteria.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving socialcriteria."
      });
    });
};

// Find a single SocialCriteria with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    SocialCriteria.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find SocialCriteria with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving SocialCriteria with id=" + id
      });
    });
};

// Update a SocialCriteria by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    SocialCriteria.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "SocialCriteria was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update SocialCriteria with id=${id}. Maybe SocialCriteria was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating SocialCriteria with id=" + id
        });
      });
};

// Delete a SocialCriteria with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Page.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "SocialCriteria was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete SocialCriteria with id=${id}. Maybe SocialCriteria was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete SocialCriteria with id=" + id
        });
      });
};

// Delete all SocialCriterias from the database.
exports.deleteAll = (req, res) => {
  SocialCriteria.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} SocialCriterias were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all SocialCriterias."
          });
        });
};

// Find all published SocialCriterias
exports.findAllPublished = (req, res) => {
  SocialCriteria.findAll({ where: { published: true } })
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