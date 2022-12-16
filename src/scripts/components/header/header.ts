import './header.css';

export const header = document.createElement('header');
header.className = 'header';

const brand = document.createElement('div');
brand.className = 'brand';

const headerContainer = document.createElement('div');
headerContainer.className = 'header__container container';

const headerLogo = document.createElement('div');
headerLogo.className = 'header__logo';

const headerTitle = document.createElement('h1');
headerTitle.className = 'header__title';
headerTitle.innerHTML = 'Online Store';

const totalPrice = document.createElement('div');
totalPrice.className = 'total-price';
totalPrice.innerHTML = `Cart total:`;

const totalPriceCard = document.createElement('span');
totalPriceCard.innerText = ` €0.00`;

const cart = document.createElement('div');
cart.className = 'cart';

const cartText = document.createElement('div');
cartText.className = 'cart__text';
cartText.innerHTML = `<div>0</div>`;

const advert = document.createElement('div');
advert.className = 'advert';

const advertInner = document.createElement('div');
advertInner.className = 'advert__inner';
advertInner.innerHTML = `
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>
<div>HOT SALE</div>`;

headerContainer.append(brand);
brand.append(headerLogo);
brand.append(headerTitle);
headerContainer.append(totalPrice);
totalPrice.append(totalPriceCard);
headerContainer.append(cart);
cart.append(cartText);

header.append(headerContainer);
header.append(advert);
advert.append(advertInner);
