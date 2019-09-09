var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', function (req, res) {
  var db = require('../db');
  var Users = db.Mongoose.model('userscollection', db.UserSchema, 'userscollection');
  Users.find({}).lean().exec(
    function (e, docs) {
      res.render('users', { 'title': 'Listagem de Usuários' , 'users': docs });
    }
  );
});

router.get('/newuser', function (req, res) {
  res.render('newuser', { 'title': 'Novo Usuário' });
});

router.post('/login', function (req, res) {
  var db = require('../db');
  var userName = req.body.username;
  var userPass = req.body.senha;
  console.log('Esse é o username: ' + userName);
  console.log('Esse é o password: ' + userPass);

  var Users = db.Mongoose.model('userscollection', db.UserSchema, 'userscollection');

  Users.find({ username: userName, password: userPass }).lean().exec(
    function (e, docs) {
      console.log('Esse é o retorno ' + docs);
      if (docs != null && docs.length > 0) {
        res.redirect("users");
      } else {
        console.log(e);
        return res.redirect("/");
      }
    }
  );
});

router.post('/addlogin', function (req, res) {
  var db = require('../db');
  var userName = req.body.username;
  var userEmail = req.body.email;
  var userPass = req.body.senha;

  var Users = db.Mongoose.model('userscollection', db.UserSchema, 'userscollection');
  var user = new Users({ username: userName, email: userEmail, password: userPass });

  user.save(function (err) {
    if (err) {
      console.log('Erro! ' + err.message);
      return err;
    } else {
      console.log('Post saved');
      res.redirect('/');
    }
  });
});

module.exports = router;
