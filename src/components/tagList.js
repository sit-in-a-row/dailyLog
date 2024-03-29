import { createElement } from "../utils/createElement.js";

export function createTagList(tagHeaderText, tagItemsText) {
    const tagList = createElement('div', 'tagList', 'tagList');
    const tagHeader = createElement('div', 'tagHeader', 'tagHeader');
    const tagItems = createElement('div', 'tagItems', 'tagItems');

    tagHeader.innerHTML = tagHeaderText;

    // for (let i=0; i<tagItemsText.length; i++) {
    for (let i=0; i<6; i++) {
        const tagItem = createElement('div', `tagItem-${i}`,'tagItem');
        tagItem.innerHTML = tagItemsText[i];
        tagItems.appendChild(tagItem);
    }

    tagList.append(tagHeader, tagItems);

    return tagList;
}