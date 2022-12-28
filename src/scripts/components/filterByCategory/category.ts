import { state } from './../../state/state';
import { filterBoxes } from './../filterBoxes/filterBoxes';
import { checkbox } from '../checkbox/checkbox';
import * as uniqCategory from '../../common/uniqCategory.json';
import { filterProducts } from '../../state/actions';
import { updateBrandFilters } from '../filterByBrand/brand';

const generateCategoryFilters = () => {
    const filterList = document.createElement('div');
    filterList.className = 'filter-list';

    const handleChange = (e: Event) => {
        console.log('checked', e);
        const span = (e.target as HTMLInputElement).parentElement?.parentElement?.lastChild?.firstChild;
        if ((e.target as HTMLInputElement).checked === true) {
            console.log('id event', (e.target as HTMLInputElement).parentElement?.parentElement?.lastChild?.firstChild);
            state.filters.category.push((e.target as HTMLInputElement).id);
            console.log('state.filters.category', state.filters.category);
            console.log('state.availableCategoryCount', state.availableCategoryCount);
        } else {
            state.filters.category = state.filters.category.filter((item) => {
                return item !== (e.target as HTMLInputElement).id;
            });
            console.log('unchecked arr', state.filters.category);
        }
        filterProducts();
        if (span) {
            span.textContent = `(${state.availableCategoryCount[(e.target as HTMLInputElement).id] || '0'}`;
        }
        updateBrandFilters();
    };

    // const categoryArr = state.products.map((product) => product.category);
    // const repeatedCategoryCount = categoryArr.reduce((acc: { [key: string]: number }, el) => {
    //     acc[el] = (acc[el] || 0) + 1;
    //     return acc;
    // }, {});
    console.log('category', state);
    const uniqCategoryArr = uniqCategory.uniqCategory;
    uniqCategoryArr.forEach((item) => {
        const checkboxCategories = checkbox(
            item,
            item,
            `(${state.availableCategoryCount[item] || '0'}`,
            '/',
            `${state.availableCategoryCount[item] || '0'})`,
            handleChange
        );
        filterList.append(checkboxCategories);
    });

    return filterList;
};

export const generateCategory = () => {
    return filterBoxes('Category', generateCategoryFilters());
};

export const updateCategoryFilters = () => {
    const filterCategoryDiv = document.querySelector('.Category');
    filterCategoryDiv?.childNodes[1].remove();
    filterCategoryDiv?.append(generateCategoryFilters());
};
