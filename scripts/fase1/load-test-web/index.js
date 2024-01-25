import { browser } from 'k6/experimental/browser';
import { check } from 'k6'

export const options = {
  scenarios: {
    ui: {
      executor: 'constant-vus',
      options: {
        browser: {
          type: 'chromium',
        },
      },
      vus: 1,
      duration: '1s'
    },
  },
}

export default async function () {
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' });

    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');
    const submitButton = page.locator('input[value="Go!"]');

    await Promise.all([
      page.waitForNavigation(),
      submitButton.click(),
    ]);

    check(page, {
      'header': page => page.locator('h2').textContent('Welcome, admin!')
    })


  } finally {
    page.close();
  }
}