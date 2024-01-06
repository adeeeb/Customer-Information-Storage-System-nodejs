const express = require("express");
const mongoose = require("mongoose");
const allRoutes = require("./routes/allRouters");
const addUserRout = require("./routes/addUser");
const port = process.env.PORT || 3000;

const methodOverride = require("method-override");
const app = express();
// const port = 3000;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

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
  .connect(
    "mongodb+srv://storeg-system:L8EMdrOVFJSASFem@cluster2.6xh2xh1.mongodb.net/all-data"
  )
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
