import express from 'express';

const app = express();
const port = 3000;

app.get('/healthcheck', (req, res) => {
  res.json({ status: 'UP' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
