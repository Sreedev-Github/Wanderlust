const express = require("express");
const router = express.Router({ mergeParams: true }); // So that we can get the id from the params
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {
  saveRedirectUrl,
} = require("../middlewares/authentication.middleware.js");
const {
  createUser,
  login,
  logoutUser,
} = require("../controllers/user.controller.js");


router
  .route("/signup")
  .get((req, res) => {
    res.render("users/signup.ejs");
  })
  .post(wrapAsync(createUser));


router.route("/login")
.get((req, res) => {
  res.render("users/login.ejs");
})
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  wrapAsync(login)
)

router.route("/logout").get(logoutUser);

module.exports = router;
