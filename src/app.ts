/*
로컬 서버를 이용해 SVG 배너 미리보기를 하고 싶다면? \(ˆoˆ)/​
1. node.js를 설치하세요.  https://nodejs.org/
2. 터미널에 'npm i'를 입력해 주세요. (dependencies 설치).
3. 터미널에 'npm run dev'를 입력해 주세요.
4.  http://localhost:9999/banner 에서 배너를 확인할 수 있습니다.

If you want to preview the SVG banner, follow these steps:
1. Install Node.js. Visit https://nodejs.org/ to download and install it.
2. Open the terminal and type 'npm i' to install dependencies.
3. In the terminal, type 'npm run dev' to start the development server.
4. Go to http://localhost:9999/banner to view the banner.
*/

import express, { Application } from 'express';
import getQuotes from '../api/getQuote';

const app: Application = express();

const port: number = 9999;

app.get('/banner', (req, res) => getQuotes(req, res));

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
