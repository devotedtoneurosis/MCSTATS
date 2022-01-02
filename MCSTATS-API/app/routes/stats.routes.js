module.exports = app => {
    const stats = require("../controllers/stats.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Stats
    router.get("/", stats.findAll);
  
    app.use('/api/stats', router);
  };