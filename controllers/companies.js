const { v4: uuidv4 } = require("uuid");
const db = require("../models");
const Company = db.Company;

const addCompany = async (req, res) => {
  try {
    const { name } = req.body;
    const info = {
      companyId: uuidv4(),
      name,
    };
    const existCompany = await Company.findOne({ where: { name: name } });
    if (existCompany) {
      return res.status(400).json({ Error: "Company already exists." });
    }
    const company = await Company.create(info);
    return res.status(201).json(company);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    return res.status(200).json(companies);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const getOneCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findOne({ where: { companyId: companyId } });
    return res.status(200).json(company);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const updated = await Company.update(req.body, { where: { companyId: companyId } });
    if (updated) {
      const updatedCompany = await Company.findOne({ where: { companyId: companyId } });
      return res.status(200).json(updatedCompany);
    }
    throw new Error("Company not found.");
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const deleted = await Company.destroy({ where: { companyId: companyId } });
    if (deleted) {
      return res.status(200).json({ Message: "Company deleted." });
    }
    throw new Error("Company not found.");
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

module.exports = {
  addCompany,
  getAllCompanies,
  getOneCompany,
  updateCompany,
  deleteCompany,
};
