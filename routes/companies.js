const express = require("express");
const router = express.Router();

const companyController = require("../controllers/companies.js");

router.post("/", companyController.addCompany);
router.get("/", companyController.getAllCompanies);
router.get("/:id", companyController.getOneCompany);
router.put("/:id", companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
