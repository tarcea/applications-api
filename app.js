const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const express = require('express');
const { checkStatus } = require('./src/checkStatus');
const {
  addApplication,
  getApplicationsByStatus,
  getApplicationsById,
} = require('./src/actions');

const app = express();

app.use(express.json());
app.use(cors());
const apiBaseURL = 'http://localhost:8000';

const checkIfValidUUID = (str) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(str);
};

const pollDB = setInterval(() => {
  checkStatus();
}, 25 * 1000);
// setTimeout(async () => await checkStatus(), 25 * 1000);
// clearInterval(pollDB);

app.post('/api/applications', async (req, res) => {
  try {
    // const apiBaseURL = await tunnel();
    const { first_name, last_name } = req.body;
    if (!first_name || !last_name) {
      res.status(400).json({ error: 'first_name and last_name required both' });
    }
    const application = await axios.post(
      `${apiBaseURL}/api/applications`,
      {
        ...req.body,
        id: uuidv4(),
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,DELETE',
          'Access-Control-Allow-Credentials': true,
        },
      }
    );

    await addApplication(application.data);

    return res
      .status(201)
      .json({ ...application.data, message: 'application created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!checkIfValidUUID(id)) {
      res.status(400).json({ error: 'id is missing or is not in UUID format' });
      return;
    }
    const application = await getApplicationsById(id);
    if (!application) {
      res.status(404).json({ error: 'the id does not exist' });
    }
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
