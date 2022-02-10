import express from 'express';

const app = express();
app.use(express.json());

app.post('/api/applications', (req, res) => {
  const { first_name, last_name } = req.body;
  return res.json({});
});

export default app;
