import { Response } from 'express';

const quotes = require('../json/quotes.json');

// 배너 설정 변수
const bannerWidth = 820;
const bannerHeight = 250;
const gradientStartColor = '#807097';
const gradientEndColor = '#647979';
const titleColor = 'white';
const titleFontSize = '24px';
const titleFontFamily = "'Helvetica', sans-serif";
const titleFontWeight = 'bold';
const messageColor = 'white';
const messageFontSize = '20px';
const messageFontFamily = "'Arial', sans-serif";
const messageFontWeight = 'normal'; // 'bold'로 변경 가능

export default function (res: Response) {
  /* 랜덤 메시지 추출 */
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  /* svg 커스터마이징 */
  const svgContent = `
  <svg width="${bannerWidth}" height="${bannerHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${gradientStartColor};stop-opacity:1" /> 
      <stop offset="100%" style="stop-color:${gradientEndColor};stop-opacity:1" /> 
    </linearGradient>
  </defs>
  <style>
    .title {
      fill: ${titleColor};
      font-size: ${titleFontSize};
      font-family: ${titleFontFamily};
      text-anchor: middle;
      font-weight: ${titleFontWeight};
    }
    .message {
      fill: ${messageColor};
      font-size: ${messageFontSize};
      font-family: ${messageFontFamily};
      text-anchor: middle;
      font-weight: ${messageFontWeight};
    }
  </style>
  <rect width="100%" height="100%" fill="url(#backgroundGradient)" />
  <text x="${bannerWidth / 2}" y="60" class="title">
    <tspan x="${bannerWidth / 2}" dy="0">🔮${randomQuote.title}</tspan>
  </text>
  <text x="${bannerWidth / 2}" y="120" class="message">
    <tspan x="${bannerWidth / 2}" dy="1.2em">💻${
      randomQuote.message.split('\n')[0]
    }</tspan>
    <tspan x="${bannerWidth / 2}" dy="1.2em">${
      randomQuote.message.split('\n')[1]
    }</tspan>
  </text>
</svg>
  `;

  /* 완성된 svg send */
  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(svgContent);
}
