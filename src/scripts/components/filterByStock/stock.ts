import { filterBoxes } from './../filterBoxes/filterBoxes';
import { multiRangeData, rangeData } from '../rangeData/rangeData';
import * as products from '../../common/products.json';
import './stock.css';

const filterList = document.createElement('div');
filterList.className = 'filter-list';

export const stock = filterBoxes('Stock', filterList);

const stockArr = products.products.map((product) => product.stock);
const minStock = Math.min.apply(null, stockArr);
const maxStock = Math.max.apply(null, stockArr);
let filtredMinStock;
let filtredMaxStock;
const minGap = 0;

const fromData = document.createElement('div');
fromData.className = 'from-data';
fromData.innerHTML = `${minStock}`;

const spanArrow = document.createElement('span');
spanArrow.innerHTML = ' ⟷ ';

const toData = document.createElement('div');
toData.className = 'to-data';
toData.innerHTML = `${maxStock}`;

export const dataStockFilter = rangeData(fromData, spanArrow, toData);
filterList.append(dataStockFilter);

const startPoint = document.createElement('input');
const endPoint = document.createElement('input');

startPoint.className = 'ng-untouched ng-pristine ng-valid';
startPoint.setAttribute('type', 'range');
startPoint.setAttribute('min', '2');
startPoint.setAttribute('max', '150');
startPoint.addEventListener('input', slideOne);
startPoint.setAttribute('value', `${minStock}`);

endPoint.className = 'ng-untouched ng-pristine ng-valid';
endPoint.setAttribute('type', 'range');
endPoint.setAttribute('min', '2');
endPoint.setAttribute('max', '150');
endPoint.addEventListener('input', slideTwo);
endPoint.setAttribute('value', `${maxStock}`);

export const dataRangeStockFilter = multiRangeData(startPoint, endPoint);
filterList.append(dataRangeStockFilter);

function slideOne() {
    if (parseInt(endPoint.value) - parseInt(startPoint.value) <= minGap) {
        startPoint.value = endPoint.value;
        -minGap;
    }

    filtredMinStock = startPoint.value.toString();
    fromData.textContent = filtredMinStock;
}

function slideTwo() {
    if (parseInt(endPoint.value) - parseInt(startPoint.value) <= minGap) {
        endPoint.value = startPoint.value;
        +minGap;
    }
    filtredMaxStock = endPoint.value.toString(); //Math.floor((+endPoint.value * maxStock) / 100).toString();
    toData.textContent = filtredMaxStock;
}
