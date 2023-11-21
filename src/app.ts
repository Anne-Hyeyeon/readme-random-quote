import express, { Application, Request, Response } from 'express';
import getQuotes from '../api/getQuote';

const app: Application = express();

const port: number = 9999;

app.get('/quotes', (req, res) => getQuotes(res));

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
