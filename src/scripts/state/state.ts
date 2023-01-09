import * as products from '../common/products.json';
import { initialCategoryCount, initialBrandCount } from './actions';
import { IState } from './types';
import { updateUI } from './actions';
let localStorageState = null;
if (localStorage['state']) {
    localStorageState = JSON.parse(localStorage['state']);
}
const InitialState: IState = {
    products: products.products,
    filteredProducts: products.products,
    searchedProducts: products.products,
    viewMode: 'big-view',
    filters: {
        brand: [],
        category: [],
        checkedInputs: {},
        maxPrice: 1749,
        minPrice: 10,
        minStock: 2,
        maxStock: 150,
        search: '',
        sortValue: 'sort-title',
    },
    availableCategoryCount: initialCategoryCount,
    availableBrandCount: initialBrandCount,
};

export const state: IState = localStorageState ? localStorageState : InitialState;
// export const state: IState = InitialState;

window.addEventListener('load', updateUI);
function setLocalStorage() {
    localStorage.setItem('state', JSON.stringify(state));
    localStorage.setItem('state', JSON.stringify(state));
}
window.addEventListener('beforeunload', setLocalStorage);
