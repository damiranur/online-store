import { state } from './state';
import { Product } from './types';
import * as products from '../common/products.json';

const categoryArr = products.products.map((product) => product.category);
export const initialCategoryCount = categoryArr.reduce((acc: { [key: string]: number }, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
}, {});

const brandArr = products.products.map((product) => product.brand);
export const initialBrandCount = brandArr.reduce((acc: { [key: string]: number }, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
}, {});

export const filterProducts = () => {
    let filteredProducts: Product[] = [];

    if (state.filters.category.length > 0 && state.filters.brand.length > 0) {
        state.filters.category.forEach((filter) => {
            filteredProducts = filteredProducts.concat(
                state.products.filter((item) => {
                    if (item.category.toLowerCase() === filter.toLowerCase()) {
                        return state.filters.brand.find((brand) => brand.toLowerCase() === item.brand.toLowerCase());
                    }
                    return;
                })
            );
        });
        console.log('filteredProducts', filteredProducts);
    }
    if (state.filters.category.length > 0 && state.filters.brand.length === 0) {
        state.filters.category.forEach((filter) => {
            filteredProducts = filteredProducts.concat(
                state.products.filter((item) => {
                    return item.category.toLowerCase() === filter.toLowerCase();
                })
            );
        });
        console.log('filteredProducts', filteredProducts);
    }

    if (state.filters.category.length === 0 && state.filters.brand.length > 0) {
        state.filters.brand.forEach((filter) => {
            filteredProducts = filteredProducts.concat(
                state.products.filter((item) => {
                    return item.brand.toLowerCase() === filter.toLowerCase();
                })
            );
        });
        console.log('filteredProducts', filteredProducts);
    }
    filteredProducts = filteredProducts.filter((item) => {
        return item.price <= state.filters.maxPrice && item.price >= state.filters.minPrice;
    });
    console.log('filteredProducts', filteredProducts);

    filteredProducts = filteredProducts.filter((item) => {
        return item.stock <= state.filters.maxStock && item.stock >= state.filters.minStock;
    });
    console.log('filteredProducts', filteredProducts);

    state.filteredProducts = filteredProducts;
    console.log('state.filteredProducts', state.filteredProducts);

    const availableCategoryCount = state.filteredProducts
        .map((product) => product.category)
        .reduce((acc: { [key: string]: number }, el) => {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
        }, {});

    state.availableCategoryCount = availableCategoryCount;
    console.log('availableCategoryCount', availableCategoryCount);

    const availableBrandCount = state.filteredProducts
        .map((product) => product.brand)
        .reduce((acc: { [key: string]: number }, el) => {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
        }, {});
    state.availableBrandCount = availableBrandCount;
    console.log('availableBrandCount', availableBrandCount);
    updateUI();
};

function updateUI() {
    console.log('updateFilters');
}
// const rewriteCurrentAmount => {
// document.querySelector('.amounts > span:first-child')
// }

// const parentEl = document.querySelector('.amounts > span:first-child');
// console.log('parentEl', parentEl);
