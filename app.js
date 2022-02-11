const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const express = require('express');
const {
  addApplication,
  getApplicationsByStatus,
  getApplicationsById,
} = require('./src/actions');

const app = express();
app.use(express.json());
app.use(cors());
const apiBaseURL = 'http://localhost:8000';

const getJobStatus = async (id) => {
  const job = await axios.get(`${apiBaseURL}/api/jobs?application_id=${id}`);
  return job.data.status;
};

app.post('/api/applications', async (req, res, next) => {
  // res.setHeader('Transfer-Encodding', 'chunked');
  const application = await axios.post(`${apiBaseURL}/api/applications`, {
    ...req.body,
    id: uuidv4(),
  });

  let jobStatus;
  jobStatus = await getJobStatus(application.data.id);
  while (jobStatus === 'pending') {
    jobStatus = await getJobStatus(application.data.id);
  }
  await addApplication({ ...application.data, status: jobStatus });

  return res.json({
    application_id: application.data.id,
    message: 'application created',
  });
});

app.get('/api/applications/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    console.log('no id');
    res.status(404).json({ message: 'please provide an id' });
    return;
  }
  const application = await getApplicationsById(id);
  res.json(application);
});

app.get('/api/applications', async (req, res) => {
  const { status } = req.query;
  const applications = await getApplicationsByStatus(status);
  res.json(applications);
});

module.exports = app;
