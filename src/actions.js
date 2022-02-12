const db = require('./db.js');

module.exports = {
  addApplication: async (app) => {
    await db.query(db.ADD_APPLICATION, [
      app.id,
      app.first_name,
      app.last_name,
      app.status,
    ]);
    return;
  },
  getApplicationsById: async (id) => {
    const { rows } = await db.query(db.GET_APPLICATIONS_BY_ID, [id]);
    return rows[0];
  },
  getApplicationsByStatus: async (status) => {
    const { rows } = await db.query(db.GET_APPLICATIONS_BY_STATUS, [status]);
    return rows;
  },
  updateStatus: async (id, status) => {
    await db.query(db.UPDATE_STATUS, [id, status]);
    return;
  },
};
