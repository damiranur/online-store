import { filterBoxes } from './../filterBoxes/filterBoxes';
import './price.css';

const filterList = document.createElement('div');
filterList.className = 'filter-list';

export const price = filterBoxes('Price', filterList);
