import { updateCategoryFilters } from './../filterByCategory/category';
import { filterBoxes } from './../filterBoxes/filterBoxes';
import { checkbox } from '../checkbox/checkbox';
import { state } from '../../state/state';
import * as uniqBrand from '../../common/uniqBrand.json';
import { filterProducts } from '../../state/actions';

const generateBrandFilters = () => {
    const filterList = document.createElement('div');
    filterList.className = 'filter-list';

    const handleChange = (e: Event) => {
        const span = (e.target as HTMLInputElement).parentElement?.parentElement?.lastChild?.firstChild;
        if ((e.target as HTMLInputElement).checked === true) {
            state.filters.brand.push((e.target as HTMLInputElement).id);
        } else {
            state.filters.brand = state.filters.brand.filter((item) => {
                return item !== (e.target as HTMLInputElement).id;
            });
        }
        filterProducts();
        if (span) {
            span.textContent = `(${state.availableBrandCount[(e.target as HTMLInputElement).id] || '0'}`;
        }
    };

    const uniqBrandArr = uniqBrand.uniqBrand;
    uniqBrandArr.forEach((item) => {
        const checkboxBrands = checkbox(
            item,
            item,
            `(${state.availableBrandCount[item] || '0'}`,
            '/',
            `${state.availableBrandCount[item] || '0'})`,
            handleChange
        );
        filterList.append(checkboxBrands);
    });
    return filterList;
};

export const generateBrand = () => {
    return filterBoxes('Brand', generateBrandFilters());
};

export const updateBrandFilters = () => {
    const filterBrandDiv = document.querySelector('.Brand');

    filterBrandDiv?.childNodes[1].remove();
    filterBrandDiv?.append(generateBrandFilters());
};
