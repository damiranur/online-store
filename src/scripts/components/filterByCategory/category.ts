import { state } from './../../state/state';
import { filterBoxes } from './../filterBoxes/filterBoxes';
import { createCheckbox } from '../checkbox/checkbox';
import * as uniqCategory from '../../common/uniqCategory.json';
import { filterProducts } from '../../state/actions';

const generateCategoryFilters = () => {
    const filterList = document.createElement('div');
    filterList.className = 'filter-list';

    const handleChange = (e: Event) => {
        const spanLeft = (e.target as HTMLInputElement).parentElement?.parentElement?.lastChild?.firstChild;
        if ((e.target as HTMLInputElement).checked === true) {
            state.filters.category.push((e.target as HTMLInputElement).id);
            state.filters.checkedInputs[(e.target as HTMLInputElement).id] = (e.target as HTMLInputElement).checked;
            console.log('state.filters.checkedInputs', state.filters.checkedInputs);
        } else {
            state.filters.category = state.filters.category.filter((item) => {
                return item !== (e.target as HTMLInputElement).id;
            });
            state.filters.checkedInputs[(e.target as HTMLInputElement).id] = false;
        }
        filterProducts();
        if (spanLeft) {
            spanLeft.textContent = `(${state.availableCategoryCount[(e.target as HTMLInputElement).id] || '0'}`;
        }
    };
    console.log('state.availableCategoryCount', state.availableCategoryCount);
    const uniqCategoryArr = uniqCategory.uniqCategory;
    uniqCategoryArr.forEach((item) => {
        const checkboxCategories = createCheckbox(
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
