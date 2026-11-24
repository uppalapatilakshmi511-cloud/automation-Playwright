
import { test } from '@playwright/test';
import { AlertPage } from './Pages/alertPage';

test.describe('JavaScript Alert Functionality', () => {

  // Scenario 1: JS Alert - Click OK
  test('Handle JS Alert and click OK', async ({ page }) => {
    const alertPage = new AlertPage(page);

    await alertPage.openAlertPage();

    await alertPage.handleJsAlert();

    await alertPage.verifyResult(
      'You successfully clicked an alert'
    );
  });

  // Scenario 2: JS Confirm - Click OK
  test('Handle JS Confirm and click OK', async ({ page }) => {
    const alertPage = new AlertPage(page);

    await alertPage.openAlertPage();

    await alertPage.handleJsConfirm();

    await alertPage.verifyResult(
      'You clicked: Ok'
    );
  });

  // Scenario 3: JS Confirm - Click Cancel
  test('Handle JS Confirm and click Cancel', async ({ page }) => {
    const alertPage = new AlertPage(page);

    await alertPage.openAlertPage();

    await alertPage.handleJsConfirmCancel();

    await alertPage.verifyResult(
      'You clicked: Cancel'
    );
  });

  // Scenario 4: JS Prompt - Enter text and click OK
  test('Handle JS Prompt and enter text', async ({ page }) => {
    const alertPage = new AlertPage(page);

    await alertPage.openAlertPage();

    await alertPage.handleJsPrompt();

    await alertPage.verifyResult(
      'You entered: Hello Lakshmi'
    );
  });

  // Scenario 5: JS Prompt - Click Cancel
  test('Handle JS Prompt and click Cancel', async ({ page }) => {
    const alertPage = new AlertPage(page);

    await alertPage.openAlertPage();

    await alertPage.handleJsPromptCancel();

    await alertPage.verifyResult(
      'You entered: null'
    );
  });

});
