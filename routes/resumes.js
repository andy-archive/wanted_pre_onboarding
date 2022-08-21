const express = require("express");
const router = express.Router();

const resumeController = require("../controllers/resumes.js");

router.post("/", resumeController.addResume);
router.get("/", resumeController.getAllResumes);
router.get("/:id", resumeController.getOneResume);
router.put("/:id", resumeController.updateResume);
router.delete("/:id", resumeController.deleteResume);

module.exports = router;
