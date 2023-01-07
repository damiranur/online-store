import { state } from '../../state/state';
import { state as cart, updateCart } from '../../state/cartState';
import Data from '../../common/products.json';
import './products.css';
import { Product } from '../../state/types';
import { filterProducts } from '../../state/actions';
const holder = document.createElement('div');
const products = state?.filteredProducts || Data.products;
const display = document.createElement('div');
let productsSorted = products;
function constructorProduct(el: Product): HTMLDivElement {
    const elem = document.createElement('div');
    const wrapper = document.createElement('div');
    wrapper.className = 'item-wrapper';
    wrapper.setAttribute('style', `background: url("${el.thumbnail}") 0% 0% / cover;`);
    elem.append(wrapper);
    const itemText = document.createElement('div');
    itemText.className = 'item-text';
    itemText.tabIndex = 0;
    wrapper.append(itemText);
    const itemTitle = document.createElement('div');
    itemTitle.className = 'item-title';
    itemTitle.textContent = el.title;
    itemText.append(itemTitle);
    const itemInfo = document.createElement('div');
    itemInfo.innerHTML = `<div class="item-info-item">
        <p>
        <span>Category: </span>${el.category}</p>
        <p><span>Brand: </span>${el.brand}</p>
        <p><span>Price: </span>€${el.price}</p>
        <p><span>Discount: </span>${el.discountPercentage}%</p>
        <p><span>Rating: </span>${el.rating}</p>
        <p><span>Stock: </span>${el.stock}</p>
        </div>`;
    itemText.append(itemInfo);
    const itemButtons = document.createElement('div');
    itemButtons.className = 'item-buttons';
    wrapper.append(itemButtons);
    const addtocartBtn = document.createElement('button');
    addtocartBtn.textContent = 'ADD TO CART';
    addtocartBtn.addEventListener('click', function () {
        cart.products.push([el, 1]);
        cart.totalAmount += 1;
        cart.totalPrice += el.price;
        updateCart(cart.totalAmount, cart.totalPrice);
    });
    const detailsBtn = document.createElement('button');
    detailsBtn.textContent = 'DETAILS';
    detailsBtn.tabIndex = 0;
    itemButtons.append(addtocartBtn, detailsBtn);
    elem.classList.add('item');
    elem.dataset.id = String(el.id);
    return elem;
}
holder.className = 'products';

export function updateProductsList(): void {
    holder.innerHTML = '';
    productsSorted = state?.searchedProducts || state?.filteredProducts || productsSorted;
    for (let i = 0; i < productsSorted.length; i++) {
        holder.append(constructorProduct(productsSorted[i]));
    }
}

updateProductsList();

const SortProducts = document.createElement('div');
SortProducts.className = 'sort-products';
const SortBar = document.createElement('div');
SortBar.className = 'sort-bar';
const select = document.createElement('select');
select.innerHTML = `<option value="sort-title" disabled="" selected="" class="sort-name">Sort options:</option>
<option value="price-ASC">Sort by price ASC</option>
<option value="price-DESC">Sort by price DESC</option>
<option value="rating-ASC">Sort by rating ASC</option>
<option value="rating-DESC">Sort by rating DESC</option>
<option value="discount-ASC">Sort by discount ASC</option>
<option value="discount-DESC">Sort by discount DESC</option>`;
SortBar.append(select);
const stat = document.createElement('div');
stat.className = 'stat';
stat.textContent = `Found: ${products.length}`;
const searchBar = document.createElement('div');
searchBar.className = 'search-bar';
const searchInput = document.createElement('input');
searchInput.type = 'search';
searchInput.placeholder = 'Search product';
searchInput.className = 'ng-untouched ng-pristine ng-valid';
searchBar.append(searchInput);
const viewMode = document.createElement('div');
viewMode.className = 'view-mode';
const smallV = document.createElement('div');
smallV.className = 'small-v';
smallV.innerHTML = '<div >.</div>'.repeat(36);
const bigV = document.createElement('div');
bigV.className = 'big-v';
bigV.innerHTML = '<div >.</div>'.repeat(16);
viewMode.append(smallV, bigV);
SortProducts.append(SortBar, stat, searchBar, viewMode);
display.classList.add('display');
display.append(SortProducts, holder);
export default display;

select.addEventListener('change', function () {
    if (select.value === 'price-ASC')
        productsSorted = (state?.filteredProducts || productsSorted).sort(function (a, b): number {
            return a.price - b.price;
        });
    if (select.value === 'price-DESC')
        productsSorted = (state?.filteredProducts || productsSorted).sort(function (a, b): number {
            return b.price - a.price;
        });
    if (select.value === 'rating-ASC')
        productsSorted = (state?.filteredProducts || productsSorted).sort(function (a, b): number {
            return a.rating - b.rating;
        });
    if (select.value === 'rating-DESC')
        productsSorted = (state?.filteredProducts || productsSorted).sort(function (a, b): number {
            return b.rating - a.rating;
        });
    if (select.value === 'discount-ASC')
        productsSorted = (state?.filteredProducts || productsSorted).sort(function (a, b): number {
            return a.discountPercentage - b.discountPercentage;
        });
    if (select.value === 'discount-DESC')
        productsSorted = (state?.filteredProducts || productsSorted).sort(function (a, b): number {
            return b.discountPercentage - a.discountPercentage;
        });

    updateProductsList();
    state.filters.sortValue = select.value;
});

searchInput.addEventListener('change', function () {
    state.filters.search = searchInput.value;
    filterProducts();
});
