import { filterBoxes } from './../filterBoxes/filterBoxes';
import { multiRangeData, rangeData } from '../rangeData/rangeData';
import { state } from '../../state/state';
import './stock.css';
import { filterProducts } from '../../state/actions';

const filterList = document.createElement('div');
filterList.className = 'filter-list';

export const stock = filterBoxes('Stock', filterList);

// const stockArr = state.products.map((product) => product.stock);
// const minStock = Math.min.apply(null, stockArr);
// const maxStock = Math.max.apply(null, stockArr);
// let filtredMinStock;
// let filtredMaxStock;
const minGap = 0;

const fromData = document.createElement('div');
fromData.className = 'from-data';
fromData.innerHTML = `${state.filters.minStock}`;

const spanArrow = document.createElement('span');
spanArrow.innerHTML = ' ⟷ ';

const toData = document.createElement('div');
toData.className = 'to-data';
toData.innerHTML = `${state.filters.maxStock}`;

export const dataStockFilter = rangeData(fromData, spanArrow, toData);
filterList.append(dataStockFilter);

const startPoint = document.createElement('input');
const endPoint = document.createElement('input');

startPoint.className = 'ng-untouched ng-pristine ng-valid';
startPoint.setAttribute('type', 'range');
startPoint.setAttribute('min', '2');
startPoint.setAttribute('max', '150');
startPoint.addEventListener('input', slideOne);
startPoint.setAttribute('value', `${state.filters.minStock}`);

endPoint.className = 'ng-untouched ng-pristine ng-valid';
endPoint.setAttribute('type', 'range');
endPoint.setAttribute('min', '2');
endPoint.setAttribute('max', '150');
endPoint.addEventListener('input', slideTwo);
endPoint.setAttribute('value', `${state.filters.maxStock}`);

export const dataRangeStockFilter = multiRangeData(startPoint, endPoint);
filterList.append(dataRangeStockFilter);

function slideOne() {
    if (parseInt(endPoint.value) - parseInt(startPoint.value) <= minGap) {
        startPoint.value = endPoint.value;
        -minGap;
    }

    state.filters.minStock = parseInt(startPoint.value);
    fromData.textContent = `${state.filters.minStock}`;
    filterProducts();
}

function slideTwo() {
    if (parseInt(endPoint.value) - parseInt(startPoint.value) <= minGap) {
        endPoint.value = startPoint.value;
        +minGap;
    }
    state.filters.maxStock = parseInt(endPoint.value); //Math.floor((+endPoint.value * maxStock) / 100).toString();
    toData.textContent = `${state.filters.maxStock}`;
    filterProducts();
}
