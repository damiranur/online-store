import { stock } from './../filterByStock/stock';
import { price } from './../filterByPrice/price';
import { button } from './../button/button';
import { generateCategory } from '../filterByCategory/category';
import { generateBrand } from '../filterByBrand/brand';
import { clearFilteredProducts } from '../../state/actions';

import './filters.css';

export const filters = document.createElement('div');
filters.className = 'filters';

const resetTotal = document.createElement('div');
resetTotal.className = 'reset-total';

const resetFilter = (e: MouseEvent) => {
    clearFilteredProducts();
};

const copyLink = (e: MouseEvent) => {
    console.log('copyLink', e);
};

const buttonResetFilters = button('Reset filters', resetFilter);
const buttonCopyLink = button('Copy Link', copyLink);

filters.append(resetTotal);
resetTotal.append(buttonResetFilters);
resetTotal.append(buttonCopyLink);
filters.append(generateCategory());
filters.append(generateBrand());
filters.append(price);
filters.append(stock);
