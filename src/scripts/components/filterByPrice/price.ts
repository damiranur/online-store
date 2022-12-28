import { filterBoxes } from './../filterBoxes/filterBoxes';
import { multiRangeData, rangeData } from '../rangeData/rangeData';
import { state } from './../../state/state';
import './price.css';

const filterList = document.createElement('div');
filterList.className = 'filter-list';

export const price = filterBoxes('Price', filterList);

const minGap = 0;

const fromData = document.createElement('div');
fromData.className = 'from-data';
fromData.innerHTML = `€${state.filters.minPrice}.00`;

const spanArrow = document.createElement('span');
spanArrow.innerHTML = ' ⟷ ';

const toData = document.createElement('div');
toData.className = 'to-data';
toData.innerHTML = `€${state.filters.maxPrice}.00`;

export const dataPriceFilter = rangeData(fromData, spanArrow, toData);
filterList.append(dataPriceFilter);

const startPoint = document.createElement('input');
const endPoint = document.createElement('input');

startPoint.className = 'ng-untouched ng-pristine ng-valid';
startPoint.setAttribute('type', 'range');
startPoint.setAttribute('min', '10');
startPoint.setAttribute('max', '1749');
startPoint.addEventListener('input', slideOne);
startPoint.setAttribute('value', `${state.filters.minPrice}`);

endPoint.className = 'ng-untouched ng-pristine ng-valid';
endPoint.setAttribute('type', 'range');
endPoint.setAttribute('min', '10');
endPoint.setAttribute('max', '1749');
endPoint.addEventListener('input', slideTwo);
endPoint.setAttribute('value', `${state.filters.maxPrice}`);

export const dataRangePriceFilter = multiRangeData(startPoint, endPoint);
filterList.append(dataRangePriceFilter);

function slideOne() {
    if (parseInt(endPoint.value) - parseInt(startPoint.value) <= minGap) {
        startPoint.value = endPoint.value;
        -minGap;
    }

    const filteredMinPrice = startPoint.value.toString();
    fromData.textContent = `€${filteredMinPrice}`;
}

function slideTwo() {
    if (parseInt(endPoint.value) - parseInt(startPoint.value) <= minGap) {
        endPoint.value = startPoint.value;
        +minGap;
    }
    const filtredMaxPrice = endPoint.value.toString();
    toData.textContent = `€${filtredMaxPrice}`;
}
