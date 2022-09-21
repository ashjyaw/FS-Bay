/*
#######################################################################
#
# Copyright (C) 2020-2022 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./db');
const secrets = require('./secrets');
// var users = require('../data/users.json');


exports.login = async (req, res) => {
  const {email, password} = req.body;
  const allUsers = await db.getAllUsers();
  // console.log(allUsers);
  const curUser = allUsers.find((user) =>{
    return user.email === email &&
    bcrypt.compareSync(password, user.password);
  });
  if (curUser) {
    const accessToken = jwt.sign(
      {email: curUser.email},
      secrets.accessToken, {
        expiresIn: '30m',
        algorithm: 'HS256',
      });
    CurrentUser = curUser;
    res.status(200).json({name: curUser.name,
      accessToken: accessToken, email: curUser.email});
  } else {
    res.status(401).send('Invalid credentials');
  }
};
// work on setting up emails or react
exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  jwt.verify(token, secrets.accessToken, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};


