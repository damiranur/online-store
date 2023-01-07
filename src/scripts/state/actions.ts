import { state } from './state';
import { Product, IState } from './types';
import * as products from '../common/products.json';
import { updateProductsList } from '../components/products/products';

const categoryArr: string[] = products.products.map((product) => product.category);
export const initialCategoryCount = categoryArr.reduce((acc: { [key: string]: number }, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
}, {});

const brandArr = products.products.map((product) => product.brand);
export const initialBrandCount = brandArr.reduce((acc: { [key: string]: number }, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
}, {});

export const updateUI = () => {
    updateCategoryFilter();
    updateBrandFilter();
    updatePriceFilter();
    updateStockFilter();
    updateProductsList();
    updateStat();
    setCheckedBox();
    setSortBy();
};

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
    }
    if (state.filters.category.length > 0 && state.filters.brand.length === 0) {
        state.filters.category.forEach((filter) => {
            filteredProducts = filteredProducts.concat(
                state.products.filter((item) => {
                    return item.category.toLowerCase() === filter.toLowerCase();
                })
            );
        });
    }

    if (state.filters.category.length === 0 && state.filters.brand.length > 0) {
        state.filters.brand.forEach((filter) => {
            filteredProducts = filteredProducts.concat(
                state.products.filter((item) => {
                    return item.brand.toLowerCase() === filter.toLowerCase();
                })
            );
        });
    }

    if (state.filters.category.length === 0 && state.filters.brand.length === 0) {
        filteredProducts = state.products;
    }

    filteredProducts = filteredProducts.filter((item) => {
        return item.price <= state.filters.maxPrice && item.price >= state.filters.minPrice;
    });

    filteredProducts = filteredProducts.filter((item) => {
        return item.stock <= state.filters.maxStock && item.stock >= state.filters.minStock;
    });

    state.filteredProducts = filteredProducts;
    state.filteredProducts = filteredProducts.filter((it) => it.title.indexOf(state.filters.search) + 1);

    const availableCategoryCount = state.filteredProducts
        .map((product) => product.category)
        .reduce((acc: { [key: string]: number }, el) => {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
        }, {});

    state.availableCategoryCount = availableCategoryCount;

    const availableBrandCount = state.filteredProducts
        .map((product) => product.brand)
        .reduce((acc: { [key: string]: number }, el) => {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
        }, {});
    state.availableBrandCount = availableBrandCount;
    updateUI();
};

const updateCategoryFilter = () => {
    const filterBox = document.querySelector('.Category');
    filterBox?.lastChild?.childNodes.forEach((checkboxWrapper) => {
        const name = (checkboxWrapper.lastChild as HTMLElement)?.dataset.name;
        if (name) {
            (checkboxWrapper.lastChild?.firstChild as HTMLElement).innerHTML = `(${
                state.availableCategoryCount[name] || '0'
            }`;
            (checkboxWrapper.lastChild?.lastChild as HTMLElement).innerHTML = `${
                state.availableCategoryCount[name] || '0'
            })`;
        } else {
            (checkboxWrapper.lastChild?.firstChild as HTMLElement).innerHTML = `(0`;
        }
        if ((checkboxWrapper.lastChild?.firstChild as HTMLElement).innerHTML === '(0') {
            (checkboxWrapper as HTMLElement).classList.remove('item-active');
            (checkboxWrapper as HTMLElement).classList.add('item-not-active');
        } else {
            (checkboxWrapper as HTMLElement).classList.remove('item-not-active');
            (checkboxWrapper as HTMLElement).classList.add('item-active');
        }
    });
};

const updateBrandFilter = () => {
    const filterBox = document.querySelector('.Brand');
    filterBox?.lastChild?.childNodes.forEach((checkboxWrapper) => {
        const name = (checkboxWrapper.lastChild as HTMLElement)?.dataset.name;
        if (name) {
            (checkboxWrapper.lastChild?.firstChild as HTMLElement).innerHTML = `(${
                state.availableBrandCount[name] || '0'
            }`;
            (checkboxWrapper.lastChild?.lastChild as HTMLElement).innerHTML = `${
                state.availableBrandCount[name] || '0'
            })`;
        } else {
            (checkboxWrapper.lastChild?.firstChild as HTMLElement).innerHTML = `(0`;
        }
        if ((checkboxWrapper.lastChild?.firstChild as HTMLElement).innerHTML === '(0') {
            (checkboxWrapper as HTMLElement).classList.remove('item-active');
            (checkboxWrapper as HTMLElement).classList.add('item-not-active');
        } else {
            (checkboxWrapper as HTMLElement).classList.remove('item-not-active');
            (checkboxWrapper as HTMLElement).classList.add('item-active');
        }
    });
};

const updatePriceFilter = () => {
    const priceArr = state.filteredProducts.map((product) => product.price);
    const minPrice = Math.min.apply(null, priceArr);
    const priceBox = document.querySelector('.Price');
    (document.querySelector('.from-data') as HTMLDivElement).innerHTML = `€${minPrice}.00`;

    (priceBox?.lastChild?.lastChild?.firstChild as HTMLInputElement).value = `${minPrice}`;

    if (priceArr.length === 0) {
        (document.querySelector('.from-data') as HTMLDivElement).innerHTML = `€${state.filters.minPrice}.00`;
        (priceBox?.lastChild?.lastChild?.firstChild as HTMLInputElement).value = `${state.filters.minPrice}`;
    }
    const maxPrice = Math.max.apply(null, priceArr);
    (document.querySelector('.to-data') as HTMLDivElement).innerHTML = `€${maxPrice}.00`;
    (priceBox?.lastChild?.lastChild?.lastChild as HTMLInputElement).value = `${maxPrice}`;

    if (priceArr.length === 0) {
        (document.querySelector('.to-data') as HTMLDivElement).innerHTML = `€${state.filters.maxPrice}.00`;
        (priceBox?.lastChild?.lastChild?.lastChild as HTMLInputElement).value = `${state.filters.maxPrice}`;
    }
};

const updateStockFilter = () => {
    const stockArr = state.filteredProducts.map((product) => product.stock);
    const minStock = Math.min.apply(null, stockArr);
    const stockBox = document.querySelector('.Stock');
    (stockBox?.lastChild?.firstChild?.firstChild as HTMLDivElement).innerHTML = `${minStock}`;
    (stockBox?.lastChild?.lastChild?.firstChild as HTMLInputElement).value = `${minStock}`;

    if (stockArr.length === 0) {
        (stockBox?.lastChild?.firstChild?.firstChild as HTMLDivElement).innerHTML = `${state.filters.minStock}`;
        (stockBox?.lastChild?.lastChild?.firstChild as HTMLInputElement).value = `${state.filters.minStock}`;
    }

    const maxStock = Math.max.apply(null, stockArr);
    (stockBox?.lastChild?.firstChild?.lastChild as HTMLDivElement).innerHTML = `${maxStock}`;
    (stockBox?.lastChild?.lastChild?.lastChild as HTMLInputElement).value = `${maxStock}`;

    if (stockArr.length === 0) {
        (stockBox?.lastChild?.firstChild?.lastChild as HTMLDivElement).innerHTML = `${state.filters.maxStock}`;
        (stockBox?.lastChild?.lastChild?.lastChild as HTMLInputElement).value = `${state.filters.maxStock}`;
    }
};

const updateStat = () => {
    const stat = document.querySelector('.stat') as HTMLElement;
    stat.textContent = '';
    stat.textContent = `Found: ${state.filteredProducts.length}`;
};

export const clearFilteredProducts = () => {
    state.filteredProducts = products.products;
    state.availableCategoryCount = initialCategoryCount;
    state.availableBrandCount = initialBrandCount;
    const allCheckBoxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckBoxes.forEach((checkbox) => ((checkbox as HTMLInputElement).checked = false));
    updateUI();
};

function setCheckedBox() {
    const allCheckBoxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckBoxes.forEach((input) => {
        (input as HTMLInputElement).checked = state.filters.checkedInputs[input.id];
    });
}

function setSortBy() {
    const selectElement = document.querySelector('select');
    const options = selectElement?.childNodes;
    const select = document.querySelector('.sort-name');

    (select as HTMLSelectElement).value = state.filters.sortValue;
    options?.forEach((option) => {
        if ((option as HTMLOptionElement).value === state.filters.sortValue) {
            (option as HTMLOptionElement).selected = true;
        }
    });
}
