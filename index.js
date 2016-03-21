'use strict';
let S_PORT = Number(process.env.S_PORT) || require('./.config').S_PORT;
let DB_PORT = process.env.DB_PORT || require('./.config').DB_PORT;

// let fs = require('fs');
let bodyParser = require('body-parser');
let express = require('express');
let app = express();
let mongoose = require('mongoose');

let User = require(__dirname + '/models/user_module.js');
// let File = require(__dirname + '/models/file_module.js');

// var s3 = new AWS.S3();

mongoose.connect(DB_PORT);

app.use(bodyParser.json());

app.route('/users')
  .get((req, res) => {
    console.log('get /users');
    User.find({})
      .populate('files')
      .exec((err, users) => {
        if (err) return res.send(err);
        res.json(users);
        console.log('responded, request terminated');
      });
  })
  .post((req, res) => {
    console.log('post /users');
    console.log(req.body);
    var newUser = new User(req.body);
    newUser.save((err, user) => {
      res.json(user);
      console.log('responded, request terminated');
    });
  });

app.route('users/:user')
  .get((req, res) => {
    console.log('request received');
    // console.log('get /users/'+req.params.user);
    res.json('get /users/'+req.params.user);
    // User.find({name: req.params.user})
    //   .populate('files')
    //   .exec((err, user) => {
    //     if (err) return res.send(err);
    //     // res.json(user);
    //     console.log('responded, request terminated');
    //   });
  })
  .put((req, res) => {
    console.log('put /users/'+req.params.user);
    res.json('put /users/'+req.params.user);
  })
  .delete((req, res) => {
    console.log('delete /users/'+req.params.user);
    res.json('delete /users/'+req.params.user);
  });

app.route('users/:user/files')
  .get((req, res) => {
    console.log('get /users/'+req.params.user+'/files');
    res.json('get /users/'+req.params.user+'/files');
  })
  .post((req, res) => {
    console.log('post /users/'+req.params.user+'/files');
    res.json('post /users/'+req.params.user+'/files');
  });

app.route('files/:file')
  .get((req, res) => {
    console.log('get /files/'+req.params.file);
    res.json('get /files/'+req.params.file);
  })
  .put((req, res) => {
    console.log('get /files/'+req.params.file);
    res.json('get /files/'+req.params.file);
  })
  .delete((req, res) => {
    console.log('get /files/'+req.params.file);
    res.json('get /files/'+req.params.file);
  });

app.listen(S_PORT, () => {
  console.log('server listening at 3000');
});
