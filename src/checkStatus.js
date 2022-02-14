const axios = require('axios');
const localtunnel = require('localtunnel');
const {
  getApplicationsByStatus,
  updateStatus,
  deleteApplication,
} = require('./actions');

const tunnel = async () => {
  const tunnel = await localtunnel({ port: 8000 });
  return tunnel.url;
};

const getJobStatus = async (id) => {
  try {
    // const apiBaseURL = await tunnel();
    const apiBaseURL = 'http://localhost:8000';
    const job = await axios.get(`${apiBaseURL}/api/jobs?application_id=${id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,DELETE',
        'Access-Control-Allow-Credentials': true,
      },
    });
    return job.data.status;
  } catch (err) {
    await deleteApplication(id);
  }
};

const checkStatus = async () => {
  try {
    const pendingApps = await getApplicationsByStatus('pending');
    if (pendingApps.length !== 0) {
      pendingApps.forEach(async (app) => {
        let status = await getJobStatus(app.id);
        await updateStatus(app.id, status);
      });
    }
  } catch (err) {
    throw err;
  }
  // setTimeout(checkStatus(), 25 * 1000);
};
module.exports = { checkStatus };
