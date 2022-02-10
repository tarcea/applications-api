const axios = require('axios');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/applications', async (req, res) => {
  const { first_name, last_name } = req.body;
  // const application = await axios.post(
  //   'http://localhost:8000/api/applications',
  //   req.body
  // );

  // const job = await axios.get(
  //   `http://localhost:8000/api/jobs?application_id=${id}`
  // );

  return res.json({
    application: req.body,
    message: 'application created',
  });
});

module.exports = app;
