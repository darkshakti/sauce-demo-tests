import {test, expect} from '@playwright/test';

/**
 * SauceDemo is a UI-only demo app without a public REST API, so this suite
 * demonstrates API-level testing with Playwright's `request` fixture against
 * the site's HTTP layer: availability, headers and served assets.
 *
 * In a real project this is where contract/REST tests would live.
 */
test.describe('HTTP / availability', () => {
  test('home page responds with 200 and HTML @smoke', async ({request}) => {
    const response = await request.get('/');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');
  });

  test('home page serves the SPA shell @regression', async ({request}) => {
    const response = await request.get('/');
    const body = await response.text();
    // SauceDemo is a React SPA: the shell carries the title and the #root mount node,
    // while the UI itself is rendered client-side from the JS bundle.
    expect(body).toContain('<title>Swag Labs</title>');
    expect(body).toContain('id="root"');
  });

  test('the JS bundle referenced by the shell is served @regression', async ({request}) => {
    const shell = await request.get('/');
    const html = await shell.text();
    // Asset hashes change between deploys, so we resolve the bundle path from the shell.
    const match = html.match(/src="(\/static\/js\/main\.[^"]+\.js)"/);
    expect(match, 'main JS bundle <script> should be present in the shell').not.toBeNull();

    const bundle = await request.get(match![1]);
    expect(bundle.status()).toBe(200);
    expect(bundle.headers()['content-type']).toContain('javascript');
  });
});
