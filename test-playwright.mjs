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

async function runTests() {
  const browser = await chromium.launch({ headless: true });
  const results = {
    consoleErrors: [],
    failedRequests: [],
    overflows: [],
    passedAssertions: [],
    screenshots: [],
  };

  for (const vp of viewports) {
    console.log(`\n================ Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ================`);
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

    // Wait for preloader transition
    await page.waitForTimeout(1600);

    // Initial check: Hero
    const heroTitle = await page.locator('.hero-monument-title').textContent();
    console.log(`[${vp.name}] Hero Title:`, heroTitle.replace(/\s+/g, ' ').trim());
    results.passedAssertions.push(`${vp.name} - Hero Title loaded`);

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

    // 1. Transition: Hero → About
    // Scroll half a viewport down
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.55));
    await page.waitForTimeout(500);
    const heroToAboutPath = path.join(ARTIFACTS_DIR, `qa_${vp.name}_1_hero_to_about.png`);
    await page.screenshot({ path: heroToAboutPath });
    results.screenshots.push(heroToAboutPath);

    // 2. Transition: About → Skills
    const aboutEl = page.locator('#about');
    await aboutEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.7));
    await page.waitForTimeout(500);
    const aboutToSkillsPath = path.join(ARTIFACTS_DIR, `qa_${vp.name}_2_about_to_skills.png`);
    await page.screenshot({ path: aboutToSkillsPath });
    results.screenshots.push(aboutToSkillsPath);

    // 3. Transition: Skills → Projects
    const skillsEl = page.locator('#skills');
    await skillsEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.8));
    await page.waitForTimeout(500);
    const skillsToProjectsPath = path.join(ARTIFACTS_DIR, `qa_${vp.name}_3_skills_to_projects.png`);
    await page.screenshot({ path: skillsToProjectsPath });
    results.screenshots.push(skillsToProjectsPath);

    // 4. Projects section
    const projectsEl = page.locator('#projects');
    await projectsEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const projectsPath = path.join(ARTIFACTS_DIR, `qa_${vp.name}_4_projects.png`);
    await page.screenshot({ path: projectsPath });
    results.screenshots.push(projectsPath);

    // 5. Transition: Projects → Open Source
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.9));
    await page.waitForTimeout(500);
    const projectsToOsPath = path.join(ARTIFACTS_DIR, `qa_${vp.name}_5_projects_to_opensource.png`);
    await page.screenshot({ path: projectsToOsPath });
    results.screenshots.push(projectsToOsPath);

    // 6. Transition: Open Source → Journey
    const osEl = page.locator('#opensource');
    await osEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.85));
    await page.waitForTimeout(500);
    const osToJourneyPath = path.join(ARTIFACTS_DIR, `qa_${vp.name}_6_opensource_to_journey.png`);
    await page.screenshot({ path: osToJourneyPath });
    results.screenshots.push(osToJourneyPath);

    // 7. Transition: Journey → Achievements
    const journeyEl = page.locator('#journey');
    await journeyEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.8));
    await page.waitForTimeout(500);
    const journeyToAchievePath = path.join(ARTIFACTS_DIR, `qa_${vp.name}_7_journey_to_achievements.png`);
    await page.screenshot({ path: journeyToAchievePath });
    results.screenshots.push(journeyToAchievePath);

    // 8. Transition: Achievements → Contact
    const achieveEl = page.locator('#achievements');
    await achieveEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.8));
    await page.waitForTimeout(500);
    const achieveToContactPath = path.join(ARTIFACTS_DIR, `qa_${vp.name}_8_achievements_to_contact.png`);
    await page.screenshot({ path: achieveToContactPath });
    results.screenshots.push(achieveToContactPath);

    // 9. Contact & Footer
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(500);
    const contactFooterPath = path.join(ARTIFACTS_DIR, `qa_${vp.name}_9_contact_footer.png`);
    await page.screenshot({ path: contactFooterPath });
    results.screenshots.push(contactFooterPath);

    // Full page overflow check across all elements
    const fullScrollOverflow = await page.evaluate(() => {
      let worstOverflow = 0;
      let offendingElements = [];

      for (const el of document.querySelectorAll('*')) {
        const rect = el.getBoundingClientRect();
        if (rect.right > window.innerWidth + 1) {
          worstOverflow = Math.max(worstOverflow, rect.right - window.innerWidth);
          offendingElements.push({
            tag: el.tagName,
            class: el.className,
            id: el.id,
            right: rect.right,
            windowWidth: window.innerWidth,
          });
        }
      }

      return {
        docScrollWidth: document.documentElement.scrollWidth,
        docClientWidth: document.documentElement.clientWidth,
        hasDocOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        worstOverflow,
        offendingElements: offendingElements.slice(0, 5),
      };
    });

    console.log(`[${vp.name}] Full Page Overflow Check:`, fullScrollOverflow);
    if (fullScrollOverflow.hasDocOverflow) {
      results.overflows.push({ vp: vp.name, point: 'full-page', ...fullScrollOverflow });
    } else {
      results.passedAssertions.push(`${vp.name} - 0px horizontal overflow across entire scroll`);
    }

    await page.close();
  }

  await browser.close();

  console.log('\n================ PLAYWRIGHT QA SUMMARY ================');
  console.log(`Console Errors: ${results.consoleErrors.length}`);
  console.log(`Failed Requests: ${results.failedRequests.length}`);
  console.log(`Overflow Violations: ${results.overflows.length}`);
  console.log(`Passed Assertions: ${results.passedAssertions.length}`);
  console.log(`Screenshots Saved: ${results.screenshots.length}`);

  if (results.consoleErrors.length > 0 || results.failedRequests.length > 0 || results.overflows.length > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
