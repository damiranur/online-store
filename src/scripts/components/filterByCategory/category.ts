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
        const span = (e.target as HTMLInputElement).parentElement?.parentElement?.lastChild?.firstChild;
        if ((e.target as HTMLInputElement).checked === true) {
            state.filters.category.push((e.target as HTMLInputElement).id);
        } else {
            state.filters.category = state.filters.category.filter((item) => {
                return item !== (e.target as HTMLInputElement).id;
            });
        }
        filterProducts();
        if (span) {
            span.textContent = `(${state.availableCategoryCount[(e.target as HTMLInputElement).id] || '0'}`;
        }
    };

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
