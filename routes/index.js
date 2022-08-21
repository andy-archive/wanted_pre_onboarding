const express = require("express");
const router = express();

const companyRouter = require("./companies");
const jobOpeningRouter = require("./jobOpenings");
const resumeRouter = require("./resumes");
const userRouter = require("./users");

router.use("/companies", companyRouter);
router.use("/job-openings", jobOpeningRouter);
router.use("/resumes", resumeRouter);
router.use("/users", userRouter);

module.exports = router;
