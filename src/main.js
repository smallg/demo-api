const express = require('express');
const { setKey, getKey, delKey } = require('./utils/redis');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  await setKey('key', 'smallg');
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
