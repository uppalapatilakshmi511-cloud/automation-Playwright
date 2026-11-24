import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('Download a single file into project downloads folder', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/download');

    // Create downloads folder in project root
    const downloadFolder = path.resolve(process.cwd(), 'downloads');

    await fs.promises.mkdir(downloadFolder, { recursive: true });

    // Wait for download event
    const downloadPromise = page.waitForEvent('download');

    // Click the first download link
    await page.locator('#content a').first().click();

    const download = await downloadPromise;

    // Get downloaded file name
    const fileName = download.suggestedFilename();

    // Save file inside project downloads folder
    const filePath = path.join(downloadFolder, fileName);

    await download.saveAs(filePath);

    // Verify downloaded file
    expect(fs.existsSync(filePath)).toBeTruthy();

    const fileStats = await fs.promises.stat(filePath);
    expect(fileStats.size).toBeGreaterThan(0);

    console.log('File downloaded successfully:', filePath);
});