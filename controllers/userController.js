const moment = require("moment");
const User = require("../models/customerSchema");

const addUserRoute = (req, res) => {
  res.render("user/add");
};

const addUserDataToDb = (req, res) => {
  User.create(req.body)
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(`error: ${err}`);
    });
};

const getAllData = (req, res) => {
  User.find()
    .then((result) => {
      res.render("index", { arr: result, moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const editSpecificData = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { item: result, moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const viewSpecificData = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Search
const searchData = (req, res) => {
  const keyword = req.body.keyword.trim();
  User.find({
    $or: [{ firstName: keyword }, { lastName: keyword }],
  })
    .then((result) => {
      res.render("user/search", { arr: result, moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteSpecificData = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateSpecificData = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  addUserRoute,
  addUserDataToDb,
  getAllData,
  editSpecificData,
  viewSpecificData,
  searchData,
  deleteSpecificData,
  updateSpecificData,
};
