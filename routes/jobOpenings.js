const express = require("express");
const router = express.Router();

const jobOpeningController = require("../controllers/jobOpenings.js");

router.post("/", jobOpeningController.addJobOpening);
router.get("/", jobOpeningController.getAllJobOpenings);
router.get("/:id", jobOpeningController.getOneJobOpening);
router.put("/:id", jobOpeningController.updateJobOpening);
router.delete("/:id", jobOpeningController.deleteJobOpening);

module.exports = router;
