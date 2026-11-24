import{test,expect} from '@playwright/test';
test('More 1', async ({page}) => {
    await page.goto('https://www.flipkart.com/');
    //await page.pause()
    // click on more option
    //await page.getByRole('button').click();
    const moreOption = await page.getByText('More');
    await expect(moreOption).toBeVisible();
    await moreOption.click();
    await page.getByText('Become a Seller').click();

});