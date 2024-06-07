const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {
  isLoggedIn,
  isOwner,
  validateListing,
} = require("../middlewares/authentication.middleware.js");
const {
  index,
  addNewListing,
  showListing,
  editListing,
  updateListing,
  deleteListing,
} = require("../controllers/listing.controllers.js");
const multer = require("multer");
const { storage } = require("../utils/cloudinaryConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(addNewListing)
  );

// New Listing
router.route("/new").get(isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// Show listing
router
  .route("/:id")
  .get(wrapAsync(showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

// Edit Route
router.route("/:id/edit").get(isLoggedIn, isOwner, wrapAsync(editListing));

module.exports = router;
