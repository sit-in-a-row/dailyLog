import { createElement, checkDuplication } from "../utils/createElement.js";

export function experiments() {
    checkDuplication('temp-blackOut');
    temporary();
}

function temporary() {
    const blackOut = createElement('div', 'temp-blackOut', 'temp-blackOut');
    const messageBox = createElement('div', 'temp-messageBox', 'temp-messageBox');
    messageBox.innerHTML = '공사중!';

    blackOut.appendChild(messageBox);
    document.body.append(blackOut);

    return blackOut;
}
