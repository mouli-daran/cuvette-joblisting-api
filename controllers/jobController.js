const Job = require("../models/job");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");

exports.createJob = BigPromise(async (req, res, next) => {
  const { companyName, title, description, logoUrl } = req.body;

  if (!companyName || !title || !description || !logoUrl) {
    return next(new CustomError("Please add the following fields", 400));
  }

  const job = Job.create({
    companyName,
    title,
    description,
    logoUrl,
    refUserId: req.user,
  });

  res.status(200).json({
    success: true,
    message: "Job created successfully",
  });
});

exports.updateJob = BigPromise(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new CustomError("No job is created for this ID", 400));
  }

  const { companyName, title, description, logoUrl } = req.body;

  if (!companyName || !title || !description || !logoUrl) {
    return next(new CustomError("Please add the following fields", 400));
  }

  await Job.updateOne(
    { _id: job.id },
    {
      $set: {
        companyName,
        title,
        description,
        logoUrl,
      },
    }
  );

  res.status(200).json({
    success: true,
    message: "Job details updated successfully",
    job,
  });
});

exports.getJobById = BigPromise(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new CustomError("No job details for this ID", 400));
  }

  res.status(200).json({
    success: true,
    jobDetails: job,
  });
});

exports.getAllJob = BigPromise(async (req, res, next) => { 
  const job = await Job.find({}, {
    companyName: 1,
    title: 1,
  });

  if (!job) {
    return next(new CustomError("No job details in the DB", 400));
  }

  res.status(200).json({
    success: true,
    jobDetails: job,
  });
});

exports.getBySearch = BigPromise(async (req, res, next) => { 
  const keyWord = req.query.title || "";
  const skills = req.query.skills;
  let filterSkills = skills?.split(',');

  let filter = {};

  if(filterSkills) {
    filter = {skills: {$in:[...filterSkills]}}
  }
  const job = await Job.find({
    title: {$regex: keyWord , $options: "i"},
    ...filter
  }, {
    // companyName: 1,
    // title: 1,
  });

  if (!job) {
    return next(new CustomError("No job details in the DB", 400));
  }

  res.status(200).json({
    success: true,
    jobDetails: job,
  });
});

exports.deleteOneJob = BigPromise(async (req, res, next) => { 
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new CustomError("No job details in the DB", 400));
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: "Job deleted successfully"
  });
});