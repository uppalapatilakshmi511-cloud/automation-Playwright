
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('Download multiple files', async ({ page }) => {

    // Step 1: Create downloads folder
    const downloadFolder = path.resolve('downloads');

    fs.mkdirSync(downloadFolder, { recursive: true });

    // Step 2: Open website
    await page.goto('https://www.playwrightautomation.com/practice.html');

    // Step 3: Get all download links
    const downloadLinks = page.locator('a[download]');

    // Step 4: Count download links
    const totalFiles = await downloadLinks.count();

    // Step 5: Download all files
    for (let i = 0; i < totalFiles; i++) {

        const downloadPromise = page.waitForEvent('download');

        await downloadLinks.nth(i).click();

        const download = await downloadPromise;

        // Step 6: Save file in downloads folder
        const filePath = path.join(
            downloadFolder,
            download.suggestedFilename()
        );

        await download.saveAs(filePath);

        console.log('Downloaded:', download.suggestedFilename());
    }

    console.log('All files downloaded successfully');

});
