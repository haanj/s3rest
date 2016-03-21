'use strict';
let S_PORT = Number(process.env.S_PORT) || require('./.config').S_PORT;
let DB_PORT = process.env.DB_PORT || require('./.config').DB_PORT;

// let fs = require('fs');
let bodyParser = require('body-parser');
let express = require('express');
let app = express();
let mongoose = require('mongoose');

let User = require(__dirname + '/models/user_module.js');
let File = require(__dirname + '/models/file_module.js');

var AWS = require('aws-sdk');
var s3 = new AWS.S3();

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
    newUser.name = newUser.name.replace(' ', '_');
    newUser.save((err, user) => {
      res.json(user);
      console.log('responded, request terminated');
    });
  });

app.route('/users/:user')
  .get((req, res) => {
    console.log('get /users/'+req.params.user);
    User.find({name: req.params.user})
      .populate('files')
      .exec((err, user) => {
        if (err) return res.send(err);
        res.json(user);
        console.log('responded, request terminated');
      });
  })
  .put((req, res) => {
    console.log('put /users/'+req.params.user);
    User.findOneAndUpdate({name: req.params.user}, req.body, (err, user) => {
      res.json(user);
    });
  })
  .delete((req, res) => {
    console.log('delete /users/'+req.params.user);
    User.findOneAndRemove({name: req.params.user}, (err, user) => {
      res.json(user);
    });
  });

app.route('/users/:user/files')
  .get((req, res) => {
    console.log('get /users/'+req.params.user+'/files');
    res.json('get /users/'+req.params.user+'/files');
  })
  .post((req, res, next) => {
    console.log('post /users/'+req.params.user+'/files');
    req.user = req.params.user;
    req.fileName = req.body.fileName;
    req.content = req.body.content;
    req.key = req.user+'-'+req.fileName; // each user can have a unique fileName
    addToBucket(req, res, next);
    addToFile(req, res, next);
    addToUser(req, res, next);
    res.json('should be done or whatever');
  });

function addToBucket(req, res, next) {
  let params = {Bucket: 'haanjBucket', Key: req.key, Body: req.content};
  s3.putObject(params, (err, data) => {
    req.ETag = data.ETag;
    console.log(data);
    next();
  });
}

function addToFile(req, res, next) {
  let fileObj = {name: req.fileName, key: req.key};
  let newFile = new File(fileObj);

  newFile.save((err, file) => {
    req.fileId = file._id;
    console.log(file);
    next();
  });
}

function addToUser(req, res, next) {
  User.findOne({name: req.params.user}, (err, user) => {
    user.files.push(req.fileId);
    user.save((err, user) => {
      console.log(user);
      next();
    });
  });
}

app.route('/files/:file')
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

s3.createBucket({Bucket: 'haanjBucket'}, function() {
  app.listen(S_PORT, () => {
    console.log('server listening at 3000');
  });
})
