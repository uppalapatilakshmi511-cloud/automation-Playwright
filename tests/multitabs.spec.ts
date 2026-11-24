import { test } from '@playwright/test';
import { MultipletabPage } from './Pages/multipletabPage';

test('Multiple Tabs Scenario', async ({ browser }) => {

    const context = await browser.newContext();

    try {

        console.log('Multiple Tabs Test Started');

        // Create first browser tab
        const page = await context.newPage();

        // Create POM object
        const tabs = new MultipletabPage(context, page);

        // Open websites
        await tabs.openGoogle();

        await tabs.openYouTube();

        await tabs.openAmazon();

        await tabs.openMyntra();

        // Switch between tabs
        await tabs.switchTabs();

        // Verify all tabs
        await tabs.verifyTabs();

        // Close individual tabs
        await tabs.closeTabs();

        console.log('Multiple Tabs Test Completed Successfully');

    }
    catch (error) {

        console.log('Multiple Tabs Test Failed:', error);

        throw error;

    }
    finally {

        // Close browser context
        await context.close();

        console.log('Browser Context Closed');

    }

});