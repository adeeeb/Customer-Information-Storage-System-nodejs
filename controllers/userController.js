const moment = require("moment");
const AuthUser = require("../models/authUser");
const jwt = require("jsonwebtoken");

const addUserRoute = (req, res) => {
  res.render("user/add");
};
// add custemor for dashboard
const addUserDataToDb = (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY_JWT);

  AuthUser.updateOne(
    { _id: decoded.id },
    {
      $push: {
        customerInfo: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          age: req.body.age,
          country: req.body.country,
          gender: req.body.gender,
          createdAt: new Date(),
        },
      },
    }
  )
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(`error: ${err}`);
    });
};

const getAllData = (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY_JWT);
  AuthUser.findOne({ _id: decoded.id })
    .then((result) => {
      res.render("index", { arr: result.customerInfo, moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const editSpecificData = (req, res) => {
  AuthUser.findOne({ "customerInfo._id": req.params.id })
    .then((result) => {
      const clickedObject = result.customerInfo.find((item) => {
        return item._id == req.params.id;
      });

      res.render("user/edit", { item: clickedObject, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const viewSpecificData = (req, res) => {
  AuthUser.findOne({ "customerInfo._id": req.params.id })
    .then((result) => {
      const clickedObject = result.customerInfo.find((item) => {
        return item._id == req.params.id;
      });

      res.render("user/view", { obj: clickedObject, moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Search
const searchData = (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY_JWT);
  const keyword = req.body.keyword.trim();
  AuthUser.findOne({ _id: decoded.id })
    .then((result) => {
      const searchCustomers = result.customerInfo.filter((item) => {
        return item.firstName == keyword || item.lastName == keyword;
      });

      res.render("user/search", { arr: searchCustomers, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteSpecificData = (req, res) => {
  AuthUser.updateOne(
    { "customerInfo._id": req.params.id },
    { $pull: { customerInfo: { _id: req.params.id } } }
  )
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateSpecificData = (req, res) => {
  AuthUser.updateOne(
    { "customerInfo._id": req.params.id },
    {
      "customerInfo.$.fireName": req.body.firstName,
      "customerInfo.$.lastName": req.body.lastName,
      "customerInfo.$.email": req.body.email,
      "customerInfo.$.phoneNumber": req.body.phoneNumber,
      "customerInfo.$.age": req.body.age,
      "customerInfo.$.country": req.body.country,
      "customerInfo.$.gender": req.body.gender,
      "customerInfo.$.updatedAt": new Date(),
    }
  )
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
