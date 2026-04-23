const { chromium } = require('playwright');
const path = require('path');

(async () => {
  process.env.PLAYWRIGHT_BROWSERS_PATH = '/opt/pw-browsers';

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const slides = [
    'slide-1-portada',
    'slide-2-incluye',
    'slide-3-beneficios',
    'slide-4-cta'
  ];

  const dir = '/home/user/claude/carrusel-promo-fisio';

  for (const slide of slides) {
    const context = await browser.newContext({
      viewport: { width: 1080, height: 1350 },
      deviceScaleFactor: 2
    });
    const page = await context.newPage();
    const filePath = `file://${path.join(dir, slide + '.html')}`;
    await page.goto(filePath, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: path.join(dir, slide + '.png'),
      clip: { x: 0, y: 0, width: 1080, height: 1350 }
    });
    console.log(`✓ Generated ${slide}.png`);
    await context.close();
  }

  await browser.close();
  console.log('\nAll slides exported to PNG');
})();
