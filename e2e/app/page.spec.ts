import { expect, test } from '@playwright/test';

test('End-to-end test for page.tsx', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const heading = await page.waitForSelector('h1');
  expect(await heading.innerText()).toBe('Home');

  const button = await page.waitForSelector('button');
  expect(await button.innerText()).toBe('Button');
});
