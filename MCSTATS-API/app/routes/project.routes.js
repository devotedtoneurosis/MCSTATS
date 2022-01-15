module.exports = app => {
    const projects = require("../controllers/project.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Projects
    router.post("/", projects.create);
  
    // Retrieve all Projects
    router.get("/", projects.findAll);
  
    // Retrieve a single Projects with id
    router.get("/:project_id", projects.findOne);
  
    // Update a Projects with id
    router.put("/:project_id", projects.update);
  
    // Delete a Projects with id
    router.delete("/:project_id", projects.delete);
  
    // Delete all Projects
    router.delete("/", projects.deleteAll);
  
    app.use('/api/projects', router);
  };