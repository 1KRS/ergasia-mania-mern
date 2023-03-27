import express from 'express'
import { createJob, deleteJob, updateJob, getAllJobs, showStats } from '../controllers/jobsController.js'

const jobsRouter = express.Router()

jobsRouter.route('/').post(createJob).get(getAllJobs);
jobsRouter.route('/stats').get(showStats); // place before :id
jobsRouter.route('/:id').delete(deleteJob).patch(updateJob);

export default jobsRouter