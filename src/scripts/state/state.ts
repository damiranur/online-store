import * as products from '../common/products.json';
import { initialCategoryCount, initialBrandCount } from './actions';
import { IState } from './types';

export const state: IState = {
    products: products.products,
    filteredProducts: products.products,
    filters: {
        brand: [],
        category: [],
        maxPrice: 1749,
        minPrice: 10,
        minStock: 2,
        maxStock: 150,
    },
    availableCategoryCount: initialCategoryCount,
    availableBrandCount: initialBrandCount,
};
