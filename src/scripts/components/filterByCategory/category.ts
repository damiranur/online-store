import { filterBoxes } from './../filterBoxes/filterBoxes';
import { checkbox } from '../checkbox/checkbox';

import './category.css';
import * as uniqCategory from '../../common/uniqCategory.json';

const filterList = document.createElement('div');
filterList.className = 'filter-list';
const checkedCategory = [];

const handleChange = (e: Event) => {
    console.log('checked', e);
    // if ((checkbox.checked === true)) {
    // }
};

// const categoryArr = products.products.map((product) => product.brand);
// console.log('categoryArr', categoryArr);

// const makeUniqCategoryArr = (categoryArr: string[]) => [...new Set(categoryArr)];
// const uniqCategoryArr = makeUniqCategoryArr(categoryArr);
// console.log('uniqCategoryArr', uniqCategoryArr);

const uniqCategoryArr = uniqCategory.uniqCategory;
console.log('uniqCategory', uniqCategory.uniqCategory);
uniqCategoryArr.forEach((item) => {
    console.log('item', item);
    const checkboxCategoryes = checkbox(item, item, '(5/5)', handleChange);
    filterList.append(checkboxCategoryes);
});

// const testcheckbox = checkbox('smartphones', 'smartphones', '(5/5)', handleChange);
// console.log('testcheckbox', testcheckbox);

export const category = filterBoxes('Category', filterList);
