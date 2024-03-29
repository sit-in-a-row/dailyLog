import { createElement } from "../utils/createElement.js";

export function createSearchBar() {
    const searchBar = createElement('input', 'searchBar', 'searchBar');
    searchBar.placeholder = 'Search Anything!';

    return searchBar;
}