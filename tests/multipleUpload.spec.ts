
import { test, expect } from '@playwright/test';
import path from 'path';

test('Upload multiple files', async ({ page }) => {

    // Step 1: Open website
    await page.goto('https://playwrightlab.github.io/');

    // Step 2: Locate multiple file input
    const fileInput = page.getByTestId('multi-file-input');

    // Step 3: Select files
    const file1 = path.resolve('test-data/sample1.txt');
    const file2 = path.resolve('test-data/sample2.txt');
    const file3 = path.resolve('test-data/LakshmiUppalapati_resume1.pdf');

    await fileInput.setInputFiles([file1, file2, file3]);

    console.log('3 files selected successfully');

    // Step 4: Verify 3 files selected
    const uploadedFiles = await fileInput.evaluate(
        (input: any) => input.files.length
    );

    expect(uploadedFiles).toBe(3);

    // Step 5: Click multiple upload button
    await page.getByRole('button', { name: 'Upload' }).last().click();

    console.log('Multiple file upload submitted');

});
