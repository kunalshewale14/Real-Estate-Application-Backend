const express = require("express");
const {
  listProperties,
  createProperty,
  getOne,
  updateProperty,
  deleteProperty
} = require("../controllers/propertyController");
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();

// every property route requires a valid session
router.use(authenticateUser);

router.get   ("/", listProperties);   // list or search
router.post  ("/", createProperty);   // add new
router.get   ("/:id", getOne);           // single property
router.put   ("/:id", updateProperty);   // update
router.delete("/:id", deleteProperty);   // remove

module.exports = router;
