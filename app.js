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

const checkIfValidUUID = (str) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(str);
};

app.post('/api/applications', async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    if (!first_name || !last_name) {
      res
        .status(400)
        .json({ message: 'first_name and last_name required both' });
    }
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!checkIfValidUUID(id)) {
      res.status(400).json({ message: 'id is not in UUID format' });
      return;
    }
    const application = await getApplicationsById(id);
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/applications', async (req, res) => {
  try {
    const { status } = req.query;

    if (status !== 'rejected' && status !== 'completed') {
      res
        .status(400)
        .json({ message: 'status should be rejected or completed' });
      return;
    }
    const applications = await getApplicationsByStatus(status);
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;
