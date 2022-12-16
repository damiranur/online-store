import './main.css';
import { filters } from '../filters/filters';

export const main = document.createElement('main');
main.className = 'app';

main.append(filters);
