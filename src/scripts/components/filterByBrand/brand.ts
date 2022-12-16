import { filterBoxes } from './../filterBoxes/filterBoxes';
import { checkbox } from '../checkbox/checkbox';

import './brand.css';
import * as uniqBrand from '../../common/uniqBrand.json';

const filterList = document.createElement('div');
filterList.className = 'filter-list';

const handleChange = (e: Event) => {
    console.log('checked', e);
};

const uniqBrandArr = uniqBrand.uniqBrand;
uniqBrandArr.forEach((item) => {
    console.log('item', item);
    const checkboxBrands = checkbox(item, item, '(0/1)', handleChange);
    filterList.append(checkboxBrands);
});
// const testcheckbox = checkbox('Apple', 'Apple', '(5/5)', handleChange);
// console.log('testcheckbox', testcheckbox);
// filterList.append(testcheckbox);

export const brand = filterBoxes('Brand', filterList);
