module.exports = app => {
    const pages = require("../controllers/pages.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Pages
    router.post("/", pages.create);
  
    // Retrieve all Pages
    router.get("/", pages.findAll);
  
    // Retrieve all pages by project
    router.get("/project_id/:id", pages.findByProjectId);
  
    // Retrieve a single Page with id
    router.get("/:id", pages.findOne);
  
    // Update a Page with id
    router.put("/:id", pages.update);
  
    // Delete a Page with id
    router.delete("/:id", pages.delete);
  
    // Delete all Pages
    router.delete("/", pages.deleteAll);
  
    app.use('/api/pages', router);
  };