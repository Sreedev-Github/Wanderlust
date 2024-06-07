const User = require("../models/user.model.js");

module.exports.createUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    if (!(username && email && password)) {
      throw new ApiError(400, "Please fill all the fields");
    }

    const newUser = new User({ email, username });

    const registeredUser = await User.register(newUser, password);
    if (registeredUser) {
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }

        req.flash("success", "Welcome to Wanderlust!");

        res.redirect("/listings");
      });
    }
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");
  res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logoutUser = (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You need to login before trying to logout");
    return res.redirect("/login");
  }
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have been successfully logged out!");
    res.redirect("/listings");
  });
};
