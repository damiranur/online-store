import { updateCategoryFilters } from './../filterByCategory/category';
import { filterBoxes } from './../filterBoxes/filterBoxes';
import { checkbox } from '../checkbox/checkbox';
import { state } from '../../state/state';
import * as uniqBrand from '../../common/uniqBrand.json';
import { filterProducts, initialBrandCount } from '../../state/actions';

const generateBrandFilters = () => {
    const filterList = document.createElement('div');
    filterList.className = 'filter-list';

    const handleChange = (e: Event) => {
        console.log('checked', e);
        const span = (e.target as HTMLInputElement).parentElement?.parentElement?.lastChild?.firstChild;
        if ((e.target as HTMLInputElement).checked === true) {
            state.filters.brand.push((e.target as HTMLInputElement).id);
            console.log('checkedBrand', state.filters.brand);
        } else {
            state.filters.brand = state.filters.brand.filter((item) => {
                return item !== (e.target as HTMLInputElement).id;
            });
            console.log('unchecked brand', state.filters.brand);
        }
        filterProducts();
        if (span) {
            span.textContent = `(${state.availableBrandCount[(e.target as HTMLInputElement).id] || '0'}`;
        }
        updateCategoryFilters();
    };

    // const brandArr = state.products.map((product) => product.brand);
    // const repeatedBrandCount = brandArr.reduce((acc: { [key: string]: number }, el) => {
    //     acc[el] = (acc[el] || 0) + 1;
    //     return acc;
    // }, {});

    // const makeUniqBrandArr = (brandArr: string[]) => [...new Set(brandArr)];
    // const uniqBrandArr: string[] = makeUniqBrandArr(brandArr);
    // console.log('uniqBrandArr', uniqBrandArr);
    console.log('state.availableBrandCount', state);
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
    console.log('filterBrandDiv', filterBrandDiv);
    console.log('filterBrandDiv', filterBrandDiv);
    filterBrandDiv?.childNodes[1].remove();
    filterBrandDiv?.append(generateBrandFilters());
};
