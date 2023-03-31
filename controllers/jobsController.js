import mongoose from 'mongoose';
import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';

const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError('Συμπλήρωσε όλα τα πεδία! (1. JobController)');
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const jobId = req.params.id;
  const { company, position } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Συμπλήρωσε όλα τα πεδία! (2. JobController)');
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`Δεν βρέθηκε εργασία με ταυτότητα: ${jobId}`);
  }

  // check permissions
  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`Δεν βρέθηκε εργασία με ταυτότητα: ${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  await job.deleteOne();
  res.status(StatusCodes.OK).json({ msg: 'Επιτυχής διαγραφή εργασίας!' });
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    Εκκρεμεί: stats.Εκκρεμεί || 0,
    Συνέντευξη: stats.Συνέντευξη || 0,
    Απορρίφθηκε: stats.Απορρίφθηκε || 0,
    Εγκρίθηκε: stats.Εγκρίθηκε || 0,
  };

  let monthlyApplications = [];

  res.status(StatusCodes.OK).json({ 
    // stats,
     defaultStats, monthlyApplications 
    });
};

export { createJob, deleteJob, updateJob, getAllJobs, showStats };
