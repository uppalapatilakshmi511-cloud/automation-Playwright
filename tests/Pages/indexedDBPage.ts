
import { Page } from '@playwright/test';

export class IndexedDBPage {

    constructor(private page: Page) { }

    // Add multiple products
    async addProducts() {

        await this.page.evaluate(() => {

            return new Promise<void>((resolve, reject) => {

                const request = (globalThis as any).indexedDB.open('MyDatabase', 1);

                request.onupgradeneeded = () => {

                    const db = request.result;

                    db.createObjectStore('Products', {
                        keyPath: 'id'
                    });

                };

                request.onsuccess = () => {

                    const db = request.result;

                    const transaction = db.transaction(
                        'Products',
                        'readwrite'
                    );

                    const store = transaction.objectStore('Products');

                    // Product 1
                    store.put({
                        id: 1,
                        name: 'Laptop',
                        price: 50000
                    });

                    // Product 2
                    store.put({
                        id: 2,
                        name: 'Mobile',
                        price: 20000
                    });

                    // Product 3
                    store.put({
                        id: 3,
                        name: 'Headphones',
                        price: 3000
                    });

                    // Product 4
                    store.put({
                        id: 4,
                        name: 'Keyboard',
                        price: 1500
                    });

                    transaction.oncomplete = () => {

                        db.close();
                        resolve();

                    };

                    transaction.onerror = () => {

                        reject(transaction.error);

                    };

                };

                request.onerror = () => {

                    reject(request.error);
  
                };

            });

        });

    }

    // Get all products
    async getAllProducts() {

        return await this.page.evaluate(() => {

            return new Promise((resolve, reject) => {

                const request = (globalThis as any).indexedDB.open('MyDatabase', 1);

                request.onsuccess = () => {

                    const db = request.result;

                    const transaction = db.transaction(
                        'Products',
                        'readonly'
                    );

                    const store = transaction.objectStore('Products');

                    const getRequest = store.getAll();

                    getRequest.onsuccess = () => {

                        resolve(getRequest.result);

                        db.close();

                    };

                    getRequest.onerror = () => {

                        reject(getRequest.error);

                    };

                };

                request.onerror = () => {

                    reject(request.error);

                };

            });

        });

    }

    // Delete a product
    async deleteProduct(id: number) {

        await this.page.evaluate((id) => {

            return new Promise<void>((resolve, reject) => {

                const request = (globalThis as any).indexedDB.open('MyDatabase', 1);

                request.onsuccess = () => {

                    const db = request.result;

                    const transaction = db.transaction(
                        'Products',
                        'readwrite'
                    );

                    const store = transaction.objectStore('Products');

                    store.delete(id);

                    transaction.oncomplete = () => {

                        db.close();
                        resolve();

                    };

                    transaction.onerror = () => {

                        reject(transaction.error);

                    };

                };

                request.onerror = () => {

                    reject(request.error);

                };

            });

        }, id);

    }

}
