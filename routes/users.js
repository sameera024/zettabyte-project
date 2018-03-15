var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var Image = require('../models/imagesModel')
/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({}).then((docs) => {
    if (docs) {
      res.json({ data });
    }
    else {
      res.status(404).send();
    }
  })
});

router.post('/adduser', (req, res) => {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    gender: req.body.gender,
    picture: req.body.picture
  });
  user.save().then((data) => {
    res.json({ _id: data._id, name: data.name })
  }).catch((error) => {
    res.json({ error });
  });
});

router.get('/getuser/:id', function (req, res) {
  User.find({ _id: req.params.id })
    .then(function (data) {
      Image.find({ uploadedBy: data[0]._id }).then((docs) => {
        data[0].picture = docs;
        res.status(200).send({ data });
      });

    });
});

router.delete('/deleteuser/:id', function (req, res) {

  var userid = req.params.id;

  User.remove({ _id: userid })
    .then(function (data) {

      res.status(200).json({ message: "successfully deleted" });
    });
});

router.put('/updateuser/:id', function (req, res) {
  User.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    .then(function (data) {
      res.status(200).send({ data });
    });
});

module.exports = router;
