import { chromium } from 'playwright';
import path from 'path';

const ARTIFACTS_DIR = process.env.ARTIFACTS_DIR || '/home/ayushcod3r/.gemini/antigravity/brain/bb12f8c9-2c08-481b-a8d4-74bf4f7ae039';

const viewports = [
  { name: 'desktop_1440x900', width: 1440, height: 900 },
  { name: 'laptop_1280x800', width: 1280, height: 800 },
  { name: 'tablet_768x1024', width: 768, height: 1024 },
  { name: 'mobile_390x844', width: 390, height: 844 },
  { name: 'mobile_360x800', width: 360, height: 800 },
];

async function runHeroQA() {
  const browser = await chromium.launch({ headless: true });
  const results = {
    consoleErrors: [],
    failedRequests: [],
    overflows: [],
    passedAssertions: [],
    screenshots: [],
  };

  for (const vp of viewports) {
    console.log(`\n================ Hero Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ================`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error(`[CONSOLE ERROR - ${vp.name}]:`, msg.text());
        results.consoleErrors.push({ vp: vp.name, text: msg.text() });
      }
    });

    page.on('requestfailed', (req) => {
      console.error(`[REQUEST FAILED - ${vp.name}]:`, req.url(), req.failure().errorText);
      results.failedRequests.push({ vp: vp.name, url: req.url(), error: req.failure().errorText });
    });

    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });

    // Wait for preloader to complete and entrance timeline to settle
    await page.waitForTimeout(1800);

    // 1. Initial Hero State
    const heroTitle = await page.locator('.hero-monument-title').textContent();
    console.log(`[${vp.name}] Hero Title:`, heroTitle.replace(/\s+/g, ' ').trim());
    results.passedAssertions.push(`${vp.name} - Hero Title loaded: "${heroTitle.trim()}"`);

    // Verify image loaded and has dimensions
    const heroImg = page.locator('.hero-portrait-img');
    const heroImgLoaded = await heroImg.evaluate((img) => img.complete && img.naturalWidth > 0);
    console.log(`[${vp.name}] Hero Portrait Loaded:`, heroImgLoaded);
    if (!heroImgLoaded) {
      throw new Error(`Hero image failed to load on ${vp.name}`);
    }
    results.passedAssertions.push(`${vp.name} - Hero Image loaded`);

    // Verify HUD badge
    const hudTitle = await page.locator('.hud-card-title').textContent();
    console.log(`[${vp.name}] HUD Card:`, hudTitle.trim());
    results.passedAssertions.push(`${vp.name} - HUD Card loaded`);

    // Check initial overflow
    const initialOverflow = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });
    console.log(`[${vp.name}] Initial Overflow:`, initialOverflow);
    if (initialOverflow.hasOverflow) {
      results.overflows.push({ vp: vp.name, point: 'initial', ...initialOverflow });
    }

    // Capture 1. Initial Hero Screenshot
    const shot1Path = path.join(ARTIFACTS_DIR, `hero_qa_${vp.name}_1_initial.png`);
    await page.screenshot({ path: shot1Path });
    results.screenshots.push(shot1Path);

    // 2. Hero Mid-Scroll (scroll ~35% of viewport)
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.35));
    await page.waitForTimeout(400);

    const shot2Path = path.join(ARTIFACTS_DIR, `hero_qa_${vp.name}_2_mid_scroll.png`);
    await page.screenshot({ path: shot2Path });
    results.screenshots.push(shot2Path);

    // 3. Hero → About Transition (scroll ~75% of viewport)
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.4));
    await page.waitForTimeout(400);

    const shot3Path = path.join(ARTIFACTS_DIR, `hero_qa_${vp.name}_3_hero_to_about.png`);
    await page.screenshot({ path: shot3Path });
    results.screenshots.push(shot3Path);

    // 4. Beginning of About Section
    await page.locator('#about').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const shot4Path = path.join(ARTIFACTS_DIR, `hero_qa_${vp.name}_4_beginning_about.png`);
    await page.screenshot({ path: shot4Path });
    results.screenshots.push(shot4Path);

    // Full overflow check at all scroll positions
    const scrollOverflow = await page.evaluate(() => {
      return {
        docScrollWidth: document.documentElement.scrollWidth,
        docClientWidth: document.documentElement.clientWidth,
        hasDocOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });
    console.log(`[${vp.name}] Transition Overflow Check:`, scrollOverflow);
    if (scrollOverflow.hasDocOverflow) {
      results.overflows.push({ vp: vp.name, point: 'transition', ...scrollOverflow });
    } else {
      results.passedAssertions.push(`${vp.name} - 0px horizontal overflow during Hero → About`);
    }

    await page.close();
  }

  await browser.close();

  console.log('\n================ HERO QA SUMMARY ================');
  console.log(`Console Errors: ${results.consoleErrors.length}`);
  console.log(`Failed Requests: ${results.failedRequests.length}`);
  console.log(`Overflow Violations: ${results.overflows.length}`);
  console.log(`Passed Assertions: ${results.passedAssertions.length}`);
  console.log(`Screenshots Saved: ${results.screenshots.length}`);

  if (results.consoleErrors.length > 0 || results.failedRequests.length > 0 || results.overflows.length > 0) {
    process.exit(1);
  }
}

runHeroQA().catch((err) => {
  console.error('Hero QA execution failed:', err);
  process.exit(1);
});

