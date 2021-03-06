const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./app/models");
db.sequelize.sync();

var corsOptions = {
  origin: "http://75.127.4.251:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MCStats API." });
});

require("./app/routes/pages.routes")(app);
require("./app/routes/stats.routes")(app);
require("./app/routes/social_criteria.routes")(app);
require("./app/routes/project.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});