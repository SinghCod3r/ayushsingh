import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = '/home/ayushcod3r/.gemini/antigravity/brain/bb12f8c9-2c08-481b-a8d4-74bf4f7ae039';

const VIEWPORTS = [
  { name: 'desktop_1440x900', width: 1440, height: 900 },
  { name: 'laptop_1280x800', width: 1280, height: 800 },
  { name: 'tablet_768x1024', width: 768, height: 1024 },
  { name: 'mobile_390x844', width: 390, height: 844 },
  { name: 'mobile_360x800', width: 360, height: 800 },
];

async function runQA() {
  const browser = await chromium.launch();
  let totalErrors = 0;
  let totalViolations = 0;
  let totalScreenshots = 0;

  for (const vp of VIEWPORTS) {
    console.log(`\n================ Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ================`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    const consoleErrors = [];
    const failedRequests = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.error(`[${vp.name}][CONSOLE ERROR] ${msg.text()}`);
      }
    });

    page.on('requestfailed', (req) => {
      failedRequests.push(`${req.method()} ${req.url()}: ${req.failure()?.errorText}`);
      console.error(`[${vp.name}][FAILED REQ] ${req.method()} ${req.url()}`);
    });

    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Initial check: overflow check
    const initialOverflow = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });
    console.log(`[${vp.name}] Initial Overflow:`, initialOverflow);
    if (initialOverflow.hasOverflow) totalViolations++;

    // 1. Scroll to About Philosophy (Manifesto)
    await page.evaluate(() => {
      const el = document.getElementById('about');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1200);

    const shot1 = path.join(ARTIFACT_DIR, `qa_${vp.name}_1_about_philosophy.png`);
    await page.screenshot({ path: shot1 });
    totalScreenshots++;

    // 2. Scroll to Human Story (Narrative + Large Editorial Visual)
    await page.evaluate(() => {
      const grid = document.querySelector('.about-editorial-grid');
      if (grid) {
        const top = grid.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1200);

    const shot2 = path.join(ARTIFACT_DIR, `qa_${vp.name}_2_about_human_story.png`);
    await page.screenshot({ path: shot2 });
    totalScreenshots++;

    // 3. Scroll to Stats Grid (Concrete Grounding)
    await page.evaluate(() => {
      const stats = document.querySelector('.about-stats-grid');
      if (stats) {
        const top = stats.getBoundingClientRect().top + window.scrollY - 200;
        window.scrollTo({ top, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1200);

    const shot3 = path.join(ARTIFACT_DIR, `qa_${vp.name}_3_about_stats.png`);
    await page.screenshot({ path: shot3 });
    totalScreenshots++;

    // 4. Scroll to Transformation Handoff (About -> Skills)
    await page.evaluate(() => {
      const skills = document.getElementById('skills');
      if (skills) {
        const top = skills.getBoundingClientRect().top + window.scrollY - 300;
        window.scrollTo({ top, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1200);

    const shot4 = path.join(ARTIFACT_DIR, `qa_${vp.name}_4_about_to_skills.png`);
    await page.screenshot({ path: shot4 });
    totalScreenshots++;

    // 5. Scroll to Skills Assembled (Capability -> Technology)
    await page.evaluate(() => {
      const skills = document.getElementById('skills');
      if (skills) {
        const top = skills.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1400);

    const shot5 = path.join(ARTIFACT_DIR, `qa_${vp.name}_5_skills_assembled.png`);
    await page.screenshot({ path: shot5 });
    totalScreenshots++;

    // Verify all nodes are visible on desktop/laptop
    if (vp.width >= 861) {
      const nodeOpacities = await page.evaluate(() => {
        const boxes = document.querySelectorAll('.skills-node-box');
        const hub = document.querySelector('.skills-hub-center');
        return {
          boxCount: boxes.length,
          allBoxesVisible: Array.from(boxes).every((b) => parseFloat(window.getComputedStyle(b).opacity) > 0.5),
          hubVisible: hub ? parseFloat(window.getComputedStyle(hub).opacity) > 0.5 : false,
        };
      });
      console.log(`[${vp.name}] Skills Assembly State:`, nodeOpacities);
      if (!nodeOpacities.allBoxesVisible || !nodeOpacities.hubVisible) {
        console.error(`[${vp.name}] WARNING: Some skills boxes or hub are not visible!`);
        totalViolations++;
      }
    } else {
      const mobileCards = await page.evaluate(() => {
        const cards = document.querySelectorAll('.skills-mobile-card');
        return {
          count: cards.length,
        };
      });
      console.log(`[${vp.name}] Mobile Skills Cards Count:`, mobileCards.count);
    }

    // Scroll-wide overflow check
    const docOverflow = await page.evaluate(() => {
      return {
        docScrollWidth: document.documentElement.scrollWidth,
        docClientWidth: document.documentElement.clientWidth,
        hasDocOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });
    console.log(`[${vp.name}] Final Overflow Check:`, docOverflow);
    if (docOverflow.hasDocOverflow) totalViolations++;

    if (consoleErrors.length > 0) totalErrors += consoleErrors.length;
    if (failedRequests.length > 0) totalErrors += failedRequests.length;

    await page.close();
  }

  await browser.close();

  console.log(`\n================ ABOUT -> SKILLS QA SUMMARY ================`);
  console.log(`Console Errors: ${totalErrors}`);
  console.log(`Overflow Violations: ${totalViolations}`);
  console.log(`Screenshots Captured: ${totalScreenshots}`);

  if (totalErrors === 0 && totalViolations === 0) {
    console.log('ALL TESTS PASSED SUCCESSFULLY! ✅');
  } else {
    process.exitCode = 1;
  }
}

runQA();

