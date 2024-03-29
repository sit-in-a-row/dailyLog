import { navBarElementList } from "../app.js";
import { checkDuplication, createElement } from "../utils/createElement.js";
import { router } from "../router.js";

export function createHeader() {
    checkDuplication('headerContainer');

    const headerContainer = createElement('div', 'headerContainer', 'headerContainer');

    const homeBtn = createHomeBtn();
    const navBarContainer = createNavBarBtn();

    headerContainer.append(homeBtn, navBarContainer);

    document.body.appendChild(headerContainer);

    return headerContainer;
}

function createHomeBtn() {

    const homeBtn = createElement('div', 'sit_in_a_row', 'sit_in_a_row');
    homeBtn.innerHTML = 'Sit_in_a_row';
    homeBtn.addEventListener('click', ()=>{
        router('main');
    });

    return homeBtn;
}

function createNavBarContainer() {
    const navBarContainer = createElement('div', 'navBarContainer', 'navBarContainer');

    return navBarContainer;
}

function createNavBarBtn() {
    const getNavBarContainer = createNavBarContainer();

    for (let i=0; i<navBarElementList.length; i++) {
        const element = createElement('div', `${navBarElementList[i]}`, 'navBarElementList');
        element.innerHTML = `${navBarElementList[i]}`;
        element.addEventListener('click', ()=>{
            router(`${navBarElementList[i]}`);
        });
        
        getNavBarContainer.appendChild(element);
    }

    return getNavBarContainer;
}