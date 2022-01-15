module.exports = app => {
    const projects = require("../controllers/project.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Projects
    router.post("/", projects.create);
  
    // Retrieve all Projects
    router.get("/", projects.findAll);
  
    // Retrieve all published Projects
    router.get("/published", projects.findAllPublished);
  
    // Retrieve a single Projects with id
    router.get("/:id", projects.findOne);
  
    // Update a Projects with id
    router.put("/:id", projects.update);
  
    // Delete a Projects with id
    router.delete("/:id", projects.delete);
  
    // Delete all Projects
    router.delete("/", projects.deleteAll);
  
    app.use('/api/projects', router);
  };