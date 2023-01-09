import './button.css';
export const button = (title: string, onClick: (e: MouseEvent) => void): HTMLButtonElement => {
    const buttonElement: HTMLButtonElement = document.createElement('button');

    buttonElement.className = 'button';
    buttonElement.addEventListener('click', onClick);
    buttonElement.setAttribute('type', 'button');
    buttonElement.innerHTML = title;

    return buttonElement;
};
