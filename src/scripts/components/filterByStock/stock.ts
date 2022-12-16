import { filterBoxes } from './../filterBoxes/filterBoxes';
import './stock.css';

const filterList = document.createElement('div');
filterList.className = 'filter-list';

export const stock = filterBoxes('Stock', filterList);
