const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Navigate to the website
  await page.goto('https://luxstone-website.vercel.app');
  
  // Wait for content to load
  await page.waitForTimeout(3000);
  
  // Navigate to Leadership Analysis
  await page.click('a[data-section="leadership-analysis"]');
  await page.waitForTimeout(1000);
  
  console.log('\n=== LEADERSHIP ANALYSIS HEADINGS ===');
  
  // Check the team member headings
  const teamMemberHeadings = await page.$$eval('.team-member h4', elements => 
    elements.map(el => ({
      text: el.textContent,
      computedStyles: {
        color: window.getComputedStyle(el).color,
        opacity: window.getComputedStyle(el).opacity,
        fontWeight: window.getComputedStyle(el).fontWeight,
        backgroundColor: window.getComputedStyle(el).backgroundColor,
        visibility: window.getComputedStyle(el).visibility,
        display: window.getComputedStyle(el).display
      }
    }))
  );
  
  teamMemberHeadings.forEach(heading => {
    console.log(`\nHeading: "${heading.text}"`);
    console.log('Styles:', heading.computedStyles);
  });
  
  // Navigate to Investment Strategy
  await page.click('a[data-section="investment-strategy"]');
  await page.waitForTimeout(1000);
  
  console.log('\n=== INVESTMENT STRATEGY HEADINGS ===');
  
  // Check focus area headings
  const focusAreaHeadings = await page.$$eval('.focus-area h4', elements => 
    elements.map(el => ({
      text: el.textContent,
      computedStyles: {
        color: window.getComputedStyle(el).color,
        opacity: window.getComputedStyle(el).opacity,
        fontWeight: window.getComputedStyle(el).fontWeight,
        backgroundColor: window.getComputedStyle(el).backgroundColor
      }
    }))
  );
  
  focusAreaHeadings.forEach(heading => {
    console.log(`\nHeading: "${heading.text}"`);
    console.log('Styles:', heading.computedStyles);
  });
  
  // Navigate to Portfolio Analysis
  await page.click('a[data-section="portfolio-analysis"]');
  await page.waitForTimeout(1000);
  
  console.log('\n=== FEATURED INVESTMENT HEADING ===');
  
  // Check featured investment heading
  const featuredHeading = await page.$eval('.featured-investment h3', el => ({
    text: el.textContent,
    computedStyles: {
      color: window.getComputedStyle(el).color,
      opacity: window.getComputedStyle(el).opacity,
      fontWeight: window.getComputedStyle(el).fontWeight,
      backgroundColor: window.getComputedStyle(el).backgroundColor
    }
  }));
  
  console.log(`\nHeading: "${featuredHeading.text}"`);
  console.log('Styles:', featuredHeading.computedStyles);
  
  // Check parent container styles
  console.log('\n=== CHECKING PARENT CONTAINERS ===');
  
  const focusAreaContainer = await page.$eval('.focus-area', el => ({
    computedStyles: {
      backgroundColor: window.getComputedStyle(el).backgroundColor,
      opacity: window.getComputedStyle(el).opacity,
      filter: window.getComputedStyle(el).filter
    }
  }));
  
  console.log('\nFocus Area Container Styles:', focusAreaContainer.computedStyles);
  
  // Take screenshots for visual inspection
  await page.screenshot({ path: 'leadership-analysis.png' });
  
  console.log('\n=== Screenshots saved ===');
  
  await browser.close();
})();