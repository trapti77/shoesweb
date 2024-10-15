const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { PORT } = require("./utils/constants.js");
const authRoutes = require("./routes/registerRoutes.js");
require("./db/conn");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

const views_path = path.join(__dirname, "../views");
app.set("view engine", "hbs");
app.set("views", views_path);

app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port number ${PORT}`);
});
