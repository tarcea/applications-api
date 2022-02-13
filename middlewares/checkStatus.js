const axios = require('axios');
const localtunnel = require('localtunnel');
const { getApplicationsByStatus, updateStatus } = require('../src/actions');
// const apiBaseURL = 'http://localhost:8000';

const tunnel = async () => {
  const tunnel = await localtunnel({ port: 8000 });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  return tunnel.url;

  tunnel.on('close', () => {
    // tunnels are closed
  });
};

const getJobStatus = async (id) => {
  const apiBaseURL = await tunnel();
  const job = await axios.get(`${apiBaseURL}/api/jobs?application_id=${id}`);
  if (!job) return;
  return job.data.status;
};

const checkStatus = async (req, resp, next) => {
  try {
    const pendingApps = await getApplicationsByStatus('pending');
    if (pendingApps.length !== 0) {
      pendingApps.forEach(async (app) => {
        const status = await getJobStatus(app.id);
        await updateStatus(app.id, status);
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = { checkStatus, tunnel };
