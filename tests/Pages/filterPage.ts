
import { Page, expect } from '@playwright/test';

type ProductTestData = {
  productName: string;
  sortOption?: string;
  networkType?: string;
  category?: string;
  displaySize?: string;
  ram?: string;
  processor?: string;
  customerRating?: string;
};

export class FilterPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Select a filter option
  async selectFilterOption(option: string) {
    const filterOption = this.page.getByText(option, {
      exact: true
    }).first();

    await expect(filterOption).toBeVisible({
      timeout: 20000
    });

    await filterOption.click();

    console.log('Filter selected:', option);
  }

  // Open filter section and select option
  async selectSectionOption(section: string, option: string) {
    console.log('Checking filter:', section, option);

    let optionLocator;

    // Display Size filter
    if (section === 'Display Size') {
      optionLocator = this.page.getByText(/8.*10.*inch/i).first();
    } else {
      optionLocator = this.page.getByText(option, {
        exact: true
      }).first();
    }

    // Open section if option is not visible
    if (!(await optionLocator.isVisible().catch(() => false))) {
      const sectionLocator = this.page.getByText(section, {
        exact: true
      }).first();

      await expect(sectionLocator).toBeVisible({
        timeout: 20000
      });

      await sectionLocator.click();

      console.log(section, 'section opened');
    }

    // Verify option is visible
    await expect(optionLocator).toBeVisible({
      timeout: 20000
    });

    // Select  option
    await optionLocator.click();

    console.log(option, 'selected successfully');
  }

  // Network Type filter
  async selectNetworkType(option: string) {
    await this.selectSectionOption('Network Type', option);
  }

  // Apply filters based on JSON data
  async applyProductFilters(product: ProductTestData) {
    console.log('Applying filters for:', product.productName);

    // Sort products
    if (product.sortOption) {
      await this.selectFilterOption(product.sortOption);
    }

    // Samsung category - Tablets
    if (product.category) {
      await this.selectFilterOption(product.category);
    }

    // Samsung Display Size
    if (product.displaySize) {
      await this.selectSectionOption(
        'Display Size',
        product.displaySize
      );
    }

    // iPhone Network Type
    if (product.networkType) {
      await this.selectNetworkType(product.networkType);
    }

    // RAM filter
    if (product.ram) {
      await this.selectSectionOption('RAM', product.ram);
    }

    // Processor filter
    if (product.processor) {
      await this.selectSectionOption(
        'Processor',
        product.processor
      );
    }

    // Customer Rating filter
    if (product.customerRating) {
      await this.selectSectionOption(
        'Customer Ratings',
        product.customerRating
      );
    }

    console.log('Filter processing completed:', product.productName);
  }
}
