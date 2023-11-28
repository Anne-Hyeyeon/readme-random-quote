import { Request, Response } from 'express';

const quotes = require('../json/quotes.json');

/* SVG 설정(SVG banner configuration) */
const bannerWidth = 820; // Banner width (default: 820px, based on GitHub standard)
const bannerHeight = 200; // Banner height

const gradientStartColor = '#555b6e'; // Gradient start color
const gradientEndColor = '#6B7AA1'; // Gradient end color

const titleColor = 'white'; // Title text color
const titleFontSize = '36px'; // Title font size
const titleFontFamily = "'Helvetica', sans-serif"; // Title font family
const titleFontWeight = 'bold'; // Title font weight

const messageColor = 'white'; // Message text color
const messageFontSize = '20px'; // Message font size
const messageFontFamily = "'Arial', sans-serif"; // Message font family
const messageFontWeight = 'normal'; // Message font weight (can be changed to 'bold')

const titleDy = '0'; // Title dy value (line height)
const messageDy = '1.5em'; // First line of message dy value (line height)

const titleEmoji = '🔮'; // Emoji for Title
const messageEmoji = '🖥️' // Emoji for Message


export default function (req: Request, res: Response) {
  
  const callbackUrl = req.query.callback as string | undefined;

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  /* SVG content */
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
  <text x="${bannerWidth / 2}" y="70" class="title">
    <tspan x="${bannerWidth / 2}" dy="${titleDy}">${titleEmoji}${randomQuote.title}</tspan>
  </text>
  <text x="${bannerWidth / 2}" y="100" class="message">
    <tspan x="${bannerWidth / 2}" dy="${messageDy}">${messageEmoji}${
      randomQuote.message.split('\n')[0]
    }</tspan>
    <tspan x="${bannerWidth / 2}" dy="${messageDy}">${
      randomQuote.message.split('\n')[1]
    }</tspan>
  </text>
</svg>
  `;

  if (callbackUrl) {
    res.redirect(callbackUrl);
  } else {
    res.setHeader("Content-Type", "image/svg+xml");
    res.status(200).send(svgContent);
  }
}
