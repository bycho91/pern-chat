const express = require("express");
const router = express.Router();
const validateForm = require("../controllers/validateForm");
const pool = require("../db");
const bcrypt = require("bcrypt");

router
  .route("/login")
  .get(async (req, res) => {
    if (req.session.user && req.session.user.username) {
      res.json({ loggedIn: true, username: req.session.user.username });
    } else {
      res.json({ loggedIn: false });
    }
  })
  .post(async (req, res) => {
    validateForm(req, res);

    const potentialLogin = await pool.query(
      "SELECT id, username, passhash FROM users u WHERE u.username = $1",
      [req.body.username]
    );

    if (potentialLogin.rowCount > 0) {
      const isSamePassword = await bcrypt.compare(
        req.body.password,
        potentialLogin.rows[0].passhash
      );
      if (isSamePassword) {
        req.session.user = {
          username: req.body.username,
          id: potentialLogin.rows[0].id,
        };
        res.json({ loggedIn: true, username: req.body.username });
      } else {
        // password is wrong
        res.json({ loggedIn: false, status: "Invalid credentials given" });
      }
    } else {
      // username does not exist
      res.json({ loggedIn: false, status: "Invalid credentials given" });
    }
  });

// SIGN UP
router.post("/register", async (req, res) => {
  validateForm(req, res);

  const existingUser = await pool.query(
    "SELECT username FROM users WHERE username=$1",
    [req.body.username]
  );

  if (existingUser.rowCount === 0) {
    // register because no matching username exists
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users(username, passhash) VALUES($1, $2) RETURNING id, username",
      [req.body.username, hashedPassword]
    );
    req.session.user = {
      username: req.body.username,
      id: newUserQuery.rows[0].id,
    };
    res.json({ loggedIn: true, username: req.body.username });
  } else {
    // username already exists
    res.json({ loggedIn: false, status: "Username taken" });
  }
});

module.exports = router;
