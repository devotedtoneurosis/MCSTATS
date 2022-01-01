const db = require("../models");
const Page = db.pages;
const Op = db.Sequelize.Op;

// Create and Save a new Page
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Page
  const page = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Page in the database
  Page.create(page)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Page."
      });
    });
};

// Retrieve all Pages from the database.
exports.findAll  = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Page.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pages."
      });
    });
};

// Find a single Page with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Page.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Page with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Page with id=" + id
      });
    });
};

// Update a Page by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Page.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Page was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Page with id=${id}. Maybe Page was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Page with id=" + id
        });
      });
};

// Delete a Page with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Page.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Page was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Page with id=${id}. Maybe Page was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Page with id=" + id
        });
      });
};

// Delete all Pages from the database.
exports.deleteAll = (req, res) => {
    Page.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Pages were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all pages."
          });
        });
};

// Find all published Pages
exports.findAllPublished = (req, res) => {
    Page.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pages."
      });
    });
};