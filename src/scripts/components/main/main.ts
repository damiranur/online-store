import './main.css';
import { filters } from '../filters/filters';
import products from '../products/products';
export const main = document.createElement('main');
main.className = 'app';

main.append(filters);
main.append(products);
