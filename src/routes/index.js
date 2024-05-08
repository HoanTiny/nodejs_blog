const newsRouter = require("./new");

function route(app) {
  app.use("/news", newsRouter);

  app.get("/search", (req, res) => {
    res.render("search");
  });

  app.post("/search", (req, res) => {
    console.log(req.body);
    res.send("");
  });
}

module.exports = route;
