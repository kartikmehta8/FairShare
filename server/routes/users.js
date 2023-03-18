var express = require('express');
var router = express.Router();
const db = require("../../model/helper");
const bcrypt = require('bcrypt');

const utils = require('../../auth/utils');
const jwt = require('jsonwebtoken');

router.use(express.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//insert a user
router.post("/users", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(7);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    db("INSERT INTO users SET ?;", req.body).then(results => {
      res.send(results.data);
    }).catch(err => res.status(500).send(err));
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

// get user by email to check any duplicate email in the system
router.get("/users/:email", function (req, res, next) {
  db("SELECT uid, concat_ws(' ', firstname,lastname) as fullname, email, password, `group`, googlesso FROM users where email = ?;", req.params.email)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// validate the user credentials
router.post('/users/signin', async function (req, res) {
  console.log("Validating user credentials...");
  const user = req.body.email;
  const pwd = req.body.password;
  const userObj = req.body.user;

  // return 400 status if username/password is not exist
  if (!user || !pwd) {
      return res.status(400).json({
          error: true,
          message: "Username or Password is required."
      });
  }

  if (!userObj) return res.status(400).send('Cannot find user');     

  try{
      const comparison = await bcrypt.compare(pwd, userObj.password);
      console.log("checking password - ", comparison);
      if (comparison) {
          // user matched
          const token = utils.generateToken(userObj);
          // get basic user details
          const usr = utils.getCleanUser(userObj);
          // return the token along with user details
          return res.json({ user: usr, token });            
      } else
          res.status(401).send("Email and password does not match")
      
  } catch(error) {
      res.status(500).send(error);
  }

  console.log("user is validated with token....")
});

// validate the user credentials from google sign-in
router.post('/users/signin/gss', async function (req, res) {
  console.log("Validating google user credentials...");
  const user = req.body.email;
  const pwd = req.body.password;
  const userObj = req.body.user;
  const googleSso = userObj.googlesso;

  // return 400 status if username/password is not exist
  if (!user || googleSso === 0) {
      return res.status(400).json({
          error: true,
          message: "Username is missing or user account has not linked with Google."
      });
  }

  if (!userObj) return res.status(400).send('Cannot find user');     

  try{
      if (googleSso) {
          // user matched
          const token = utils.generateToken(userObj);
          // get basic user details
          const usr = utils.getCleanUser(userObj);
          // return the token along with user details
          return res.json({ user: usr, token });            
      } else
          res.status(401).send("Google SSO error.")
      
  } catch(error) {
      res.status(500).send(error);
  }

  console.log("google user is validated with token....")
});

router.post('/users/verify-token', function (req, res) {
  // check header or url parameters or post parameters for token
  var token = req.body.token;
  var userId = req.body.user.uid;
  if (!token) {
      return res.status(400).json({
          error: true,
          message: "Token is required."
      });
  }

  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) return res.status(401).json({
          error: true,
          message: "Invalid token."
      });

      // return 401 status if the userId does not match.
      if (user.uid !== userId) {
          return res.status(401).json({
              error: true,
              message: "Invalid user. Relogin required."
          });
      }
      console.log("--token is validated--");
      // get basic user details
      var userObj = utils.getCleanUser(req.body.user);
      return res.json({ user: userObj, token });
  });
});

module.exports = router;
