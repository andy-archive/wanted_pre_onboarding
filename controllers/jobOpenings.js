const { v4: uuidv4 } = require("uuid");
const db = require("../models");
const JobOpening = db.JobOpening;

const addJobOpening = async (req, res) => {
  try {
    const { fkCompanyId, description, techStack, nationality, region, position, compensation } = req.body;
    const info = {
      jobOpeningId: uuidv4(),
      fkCompanyId,
      description,
      techStack,
      nationality,
      region,
      position,
      compensation
    };
    const existJopOpening = await JobOpening.findOne({ where: { description: description } });
    if (existJopOpening) {
      return res.status(400).json({ Error: "Jop opening already exists." });
    }
    const jobOpening = await JobOpening.create(info);
    return res.status(200).json(jobOpening);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const getAllJobOpenings = async (req, res) => {
  try {
    const companies = await JobOpening.findAll();
    return res.status(200).json(companies);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const getOneJobOpening = async (req, res) => {
  try {
    const jobOpeningId = req.params.id;
    const jobOpening = await JobOpening.findOne({ where: { jobOpeningId: jobOpeningId } });
    return res.status(200).json(jobOpening);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const updateJobOpening = async (req, res) => {
  try {
    const jobOpeningId = req.params.id;
    const updated = await JobOpening.update(req.body, { where: { jobOpeningId: jobOpeningId } });
    if (updated) {
      const updatedJopOpening = await JobOpening.findOne({ where: { jobOpeningId: jobOpeningId } });
      return res.status(200).json(updatedJopOpening);
    }
    throw new Error("Job opening not found.");
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const deleteJobOpening = async (req, res) => {
  try {
    const jobOpeningId = req.params.id;
    const deleted = await JobOpening.destroy({ where: { jobOpeningId: jobOpeningId } });
    if (deleted) {
      return res.status(200).json({ Message: "Job opening deleted." });
    }
    throw new Error("Job opening not found.");
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

module.exports = {
  addJobOpening,
  getAllJobOpenings,
  getOneJobOpening,
  updateJobOpening,
  deleteJobOpening,
};
