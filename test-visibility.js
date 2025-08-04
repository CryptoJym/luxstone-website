const playwright = require('playwright');

async function testHeadingVisibility() {
  const browser = await playwright.chromium.launch({ 
    headless: false,
    slowMo: 100 
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Loading website...');
  await page.goto('https://luxstone-website.vercel.app', { waitUntil: 'networkidle' });
  
  // Wait for content
  await page.waitForSelector('.nav-link', { timeout: 10000 });
  
  // Navigate to Leadership Analysis
  console.log('\n=== Testing Leadership Analysis ===');
  await page.click('a[data-section="leadership-analysis"]');
  await page.waitForTimeout(1000);
  
  // Check if team member headings are visible
  const teamHeadings = await page.$$eval('.team-member h4', elements => 
    elements.map(el => {
      const styles = window.getComputedStyle(el);
      return {
        text: el.textContent,
        color: styles.color,
        opacity: styles.opacity,
        isVisible: el.offsetParent !== null,
        computedColor: styles.color
      };
    })
  );
  
  console.log('Team Member Headings:');
  teamHeadings.forEach(h => {
    console.log(`- "${h.text}": color=${h.color}, opacity=${h.opacity}, visible=${h.isVisible}`);
  });
  
  // Navigate to Investment Strategy
  console.log('\n=== Testing Investment Strategy ===');
  await page.click('a[data-section="investment-strategy"]');
  await page.waitForTimeout(1000);
  
  const focusHeadings = await page.$$eval('.focus-area h4', elements => 
    elements.map(el => {
      const styles = window.getComputedStyle(el);
      return {
        text: el.textContent,
        color: styles.color,
        opacity: styles.opacity
      };
    })
  );
  
  console.log('Focus Area Headings:');
  focusHeadings.forEach(h => {
    console.log(`- "${h.text}": color=${h.color}, opacity=${h.opacity}`);
  });
  
  // Check CSS variable value
  const cssVarValue = await page.evaluate(() => {
    return getComputedStyle(document.documentElement).getPropertyValue('--corporate-navy');
  });
  
  console.log(`\n--corporate-navy CSS variable: "${cssVarValue}"`);
  
  // Take screenshots
  await page.screenshot({ path: 'leadership-test.png', fullPage: false });
  
  await browser.close();
}

testHeadingVisibility().catch(console.error);