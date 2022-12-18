import './checkbox.css';

export const checkbox = (id: string, label: string, span: string, onChange: (e: Event) => void): HTMLElement => {
    const itemCategory: HTMLElement = document.createElement('div');
    itemCategory.className = 'item-category item-active';

    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'checkbox');
    inputElement.setAttribute('id', id);
    inputElement.addEventListener('change', onChange);

    const labelElement = document.createElement('label');
    labelElement.innerText = label;
    labelElement.setAttribute('for', `${id}`);

    const spanElement = document.createElement('span');
    spanElement.innerHTML = span;

    itemCategory.append(inputElement);
    itemCategory.append(labelElement);
    itemCategory.append(spanElement);

    return itemCategory;
};
