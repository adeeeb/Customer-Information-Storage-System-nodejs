const express = require("express");
const mongoose = require("mongoose");
const allRoutes = require("./routes/allRouters");
const addUserRout = require("./routes/addUser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const port = process.env.PORT || process.env.LOCAL_PORT;

const methodOverride = require("method-override");
const app = express();
// const port = process.env.LOCAL_PORT;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());

//Auto REfresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(allRoutes);
app.use("/user/add.html", addUserRout);
