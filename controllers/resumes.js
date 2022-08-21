const { v4: uuidv4 } = require("uuid");
const db = require("../models");
const Resume = db.Resume;

const addResume = async (req, res) => {
  try {
    const { fkUserId, fkJobOpeningId, description } = req.body;
    const info = {
      resumeId: uuidv4(),
      fkUserId,
      fkJobOpeningId,
      description,
    };
    const existResume = await Resume.findOne({ where: { description: description } });
    if (existResume) {
      return res.status(400).json({ Error: "Resume already exists." });
    }
    const resume = await Resume.create(info);
    return res.status(201).json(resume);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.findAll();
    return res.status(200).json(resumes);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const getOneResume = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const resume = await Resume.findOne({ where: { resumeId: resumeId } });
    return res.status(200).json(resume);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const updateResume = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const updated = await Resume.update(req.body, { where: { resumeId: resumeId } });
    if (updated) {
      const updatedResume = await Resume.findOne({ where: { resumeId: resumeId } });
      return res.status(200).json(updatedResume);
    }
    throw new Error("Resume not found.");
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const deleted = await Resume.destroy({ where: { resumeId: resumeId } });
    if (deleted) {
      return res.status(200).json({ Message: "Resume deleted." });
    }
    throw new Error("Resume not found.");
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

module.exports = {
  addResume,
  getAllResumes,
  getOneResume,
  updateResume,
  deleteResume,
};
