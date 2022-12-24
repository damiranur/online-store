import './rangeData.css';

export const rangeData = (fromData: HTMLDivElement, span: HTMLSpanElement, toData: HTMLDivElement): HTMLElement => {
    const outData: HTMLElement = document.createElement('div');
    outData.className = 'out-data';

    outData.append(fromData);
    outData.append(span);
    outData.append(toData);

    return outData;
};

export const multiRangeData = (startPoint: HTMLInputElement, endPoint: HTMLInputElement): HTMLElement => {
    const multiRange: HTMLElement = document.createElement('div');
    multiRange.className = 'multi-range';
    multiRange.append(startPoint);
    multiRange.append(endPoint);

    return multiRange;
};
