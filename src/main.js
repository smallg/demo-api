import express from 'express';
import { createClient } from 'redis';

const app = express();
const port = 3000;
const client = await createClient()
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect();

app.get('/', async (req, res) => {
  await client.set('key', 'value3333');
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
