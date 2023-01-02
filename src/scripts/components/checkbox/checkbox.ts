import './checkbox.css';

export const createCheckbox = (
    id: string,
    label: string,
    span1: string,
    span2: string,
    span3: string,
    onChange: (e: Event) => void
): HTMLElement => {
    const itemCategory: HTMLElement = document.createElement('div');
    itemCategory.className = 'item-category item-active';

    const inputLabel = document.createElement('div');

    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'checkbox');
    inputElement.setAttribute('id', id);
    inputElement.addEventListener('change', onChange);

    const labelElement = document.createElement('label');
    labelElement.innerText = label;
    labelElement.setAttribute('for', `${id}`);

    const amounts = document.createElement('div');
    amounts.className = 'amounts';
    amounts.setAttribute('data-name', id);

    const spanCurrentAmountOfProducts: HTMLSpanElement = document.createElement('span');
    spanCurrentAmountOfProducts.innerHTML = span1;

    const spanElementDash = document.createElement('span');
    spanElementDash.innerHTML = span2;

    const spanElement = document.createElement('span');
    spanElement.innerHTML = span3;

    itemCategory.append(inputLabel);
    inputLabel.append(inputElement);
    inputLabel.append(labelElement);
    itemCategory.append(amounts);
    amounts.append(spanCurrentAmountOfProducts);
    amounts.append(spanElementDash);
    amounts.append(spanElement);

    return itemCategory;
};
