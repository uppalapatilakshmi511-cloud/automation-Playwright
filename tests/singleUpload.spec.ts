
import { test, expect } from '@playwright/test';
import path from 'path';

test('Upload my resume PDF document', async ({ page }) => {

    // Step 1: Open upload website
    await page.goto('https://the-internet.herokuapp.com/upload');

    // Step 2: Locate file upload element
    const fileInput = page.locator('#file-upload');

    // Step 3: Get PDF document path
    const filePath = path.resolve(
        __dirname,
        '../test-data/LakshmiUppalapati_resume1.pdf'
    );

    // Step 4: Upload PDF document
    await fileInput.setInputFiles(filePath);

    console.log('Resume PDF selected successfully');

    // Step 5: Verify selected file name
    await expect(fileInput).toHaveValue(/LakshmiUppalapati_resume1\.pdf/);

    // Step 6: Click Upload button
    await page.locator('#file-submit').click();

    // Step 7: Verify successful upload
    await expect(page.locator('h3')).toHaveText('File Uploaded!');

    // Step 8: Verify uploaded document name
    await expect(page.locator('#uploaded-files'))
        .toHaveText('LakshmiUppalapati_resume1.pdf');

    console.log('Resume uploaded successfully');

});
