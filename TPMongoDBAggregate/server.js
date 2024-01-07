const express = require('express');
const musicRoutes = require('./server/musicRoutes');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(express.json());

app.use('/api/music', musicRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
