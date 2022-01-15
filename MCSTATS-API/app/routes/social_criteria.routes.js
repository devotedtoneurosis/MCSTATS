module.exports = app => {
    const social_criterias = require("../controllers/social_criteria.controller.js");
  
    var router = require("express").Router();
  
    // Create a new SocialCriteria
    router.post("/", social_criterias.create);
  
    // Retrieve all SocialCriteria
    router.get("/", social_criterias.findAll);
  
    // Retrieve a single SocialCriteria with id
    router.get("/:id", social_criterias.findOne);
  
    // Update a SocialCriteria with id
    router.put("/:id", social_criterias.update);
  
    // Delete a SocialCriteria with id
    router.delete("/:id", social_criterias.delete);
  
    // Delete all SocialCriteria
    router.delete("/", social_criterias.deleteAll);
  
    app.use('/api/social_criterias', router);
  };