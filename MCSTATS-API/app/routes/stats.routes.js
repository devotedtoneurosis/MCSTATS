module.exports = app => {
    const stats = require("../controllers/stats.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Stats
    router.get("/", stats.findAll);

    // Retrieve all Stats by project
    router.get("/project_id/:id", stats.findByProjectId);
  
    app.use('/api/stats', router);
  };