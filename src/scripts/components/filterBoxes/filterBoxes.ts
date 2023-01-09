import './filterBoxes.css';

export const filterBoxes = (boxTitle: string, mainBlock: HTMLDivElement): HTMLElement => {
    const filterBox: HTMLElement = document.createElement('div');
    filterBox.className = `filter__box ${boxTitle}`;
    filterBox.innerHTML = `<h3>${boxTitle}</h3>`;
    filterBox.append(mainBlock);

    return filterBox;
};
