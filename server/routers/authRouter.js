const express = require("express");
const router = express.Router();
const validateForm = require("../controllers/validateForm");
const pool = require("../db");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
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
    } else {
      res.json({ loggedIn: false, status: "Invalid credentials given" });
    }
  } else {
    console.log("not good");
    res.json({ loggedIn: false, status: "Invalid credentials given" });
  }
});
router.post("/register", async (req, res) => {
  validateForm(req, res);

  const existingUser = await pool.query(
    "SELECT username FROM users WHERE username=$1",
    [req.body.username]
  );

  if (existingUser.rowCount === 0) {
    // register
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users(username, passhash) VALUES($1, $2) RETURNING id, username",
      [req.body.username, hashedPassword]
    );
    req.session.user = {
      username: req.body.username,
      id: newUserQuery.rows[0].id,
    };
    res.json({ loggedIn: true, username });
  } else {
    res.json({ loggedIn: false, status: "Username taken" });
  }
});

module.exports = router;
