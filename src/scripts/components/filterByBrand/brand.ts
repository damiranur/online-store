import { filterBoxes } from './../filterBoxes/filterBoxes';
import { checkbox } from '../checkbox/checkbox';
import * as products from '../../common/products.json';

import './brand.css';
import * as uniqBrand from '../../common/uniqBrand.json';

const filterList = document.createElement('div');
filterList.className = 'filter-list';
let checkedBrand: string[] = [];

const handleChange = (e: Event) => {
    console.log('checked', e);
    if ((e.target as HTMLInputElement).checked === true) {
        checkedBrand.push((e.target as HTMLInputElement).id);
        console.log('checkedBrand', checkedBrand);
    } else {
        checkedBrand = checkedBrand.filter((item) => {
            return item !== (e.target as HTMLInputElement).id;
        });
        console.log('unchecked brand', checkedBrand);
    }
};

const brandArr = products.products.map((product) => product.brand);
console.log('brandArr', brandArr);
const repeatedBrandCount = brandArr.reduce((acc: { [key: string]: number }, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
}, {});
console.log('repeatedBrandCount', repeatedBrandCount);

const uniqBrandArr = uniqBrand.uniqBrand;
uniqBrandArr.forEach((item) => {
    const checkboxBrands = checkbox(item, item, `(0/${repeatedBrandCount[item]})`, handleChange);
    filterList.append(checkboxBrands);
});

export const brand = filterBoxes('Brand', filterList);
