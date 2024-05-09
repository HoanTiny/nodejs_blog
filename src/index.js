const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const port = 3006;

const route = require("./routes");
const db = require("./config/db");

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
// app.engine("handlebars", handlebars());
app.engine(
  "hbs",
  handlebars.engine({ defaultLayout: "main", extname: ".hbs" })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
