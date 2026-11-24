// import { Page } from '@playwright/test';

// export default class HelperMethod {
//   readonly page: Page;

//   constructor(page: Page) {
//     this.page = page;
//   }

//   // Open Flipkart website
//   async openWebsite(): Promise<void> {
//     console.log(' Opening Flipkart website');

//     await this.page.goto('https://www.flipkart.com/');
//   }

//   // Close login popup if visible
//   async closeLoginPopupIfVisible(): Promise<void> {
//     const closeButton = this.page.getByText('✕', {
//       exact: true
//     });

//     const isVisible = await closeButton.isVisible().catch(() => false);

//     if (isVisible) {
//       console.log('Closing login popup');

//       await closeButton.click();
//     }
//   }
// }