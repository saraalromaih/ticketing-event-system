const { test, expect } = require('@playwright/test');

test('simple dummy test', async ({ page }) => {
  
  expect(1).toBe(1);
});
