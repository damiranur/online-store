import { filterBoxes } from './../filterBoxes/filterBoxes';
import { checkbox } from '../checkbox/checkbox';
import * as products from '../../common/products.json';
import './category.css';
import * as uniqCategory from '../../common/uniqCategory.json';

const filterList = document.createElement('div');
filterList.className = 'filter-list';
let checkedCategory: string[] = [];

const handleChange = (e: Event) => {
    console.log('checked', e);
    if ((e.target as HTMLInputElement).checked === true) {
        console.log('id event', (e.target as HTMLInputElement).id);
        checkedCategory.push((e.target as HTMLInputElement).id);
        console.log('checkedCategory', checkedCategory);
    } else {
        checkedCategory = checkedCategory.filter((item) => {
            return item !== (e.target as HTMLInputElement).id;
            console.log('uslovie', item, (e.target as HTMLInputElement).id, item !== (e.target as HTMLInputElement).id);
        });
        console.log('unchecked arr', checkedCategory);
    }
};

const categoryArr = products.products.map((product) => product.category);
console.log('categoryArr', categoryArr);
const repeatedCategoryCount = categoryArr.reduce((acc: { [key: string]: number }, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
}, {});
console.log('repeatedCategoryCount', repeatedCategoryCount);

// const makeUniqCategoryArr = (categoryArr: string[]) => [...new Set(categoryArr)];
// const uniqCategoryArr = makeUniqCategoryArr(categoryArr);
// console.log('uniqCategoryArr', uniqCategoryArr);

const uniqCategoryArr = uniqCategory.uniqCategory;
uniqCategoryArr.forEach((item) => {
    const checkboxCategoryes = checkbox(item, item, `(5/${repeatedCategoryCount[item]})`, handleChange);
    filterList.append(checkboxCategoryes);
});

export const category = filterBoxes('Category', filterList);
