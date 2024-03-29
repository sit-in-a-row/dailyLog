import { createElement } from "../utils/createElement.js";
import { linkArticle, createRightArea, createCategoryPageList } from "../pages/posts.js";
import { articlesData } from "../../articles/landing/articleLanding.js";

const container = document.getElementById('initPageContainer');


export function createMenuList(menuHeaderText, menuItemsText, articlesData) {
    const menuList = createElement('div', 'menuList', 'menuList');
    const menuHeader = createElement('div', 'menuHeader', 'menuHeader');
    const menuItems = createElement('div', 'menuItems', 'menuItems');

    menuHeader.innerHTML = menuHeaderText;
    menuHeader.addEventListener('click', ()=>{
        createRightArea();
    })

    for (let i=0; i<menuItemsText.length; i++) {
        const menuItem = createElement('div', `menuItem-${i}`,'menuItem');
        menuItem.innerHTML = menuItemsText[i];

        if (menuHeaderText === 'Recent Posts') {
            menuItem.addEventListener('click', ()=>{
                linkArticle(`${articlesData[i].folder}/${articlesData[i].title}`);
            });
        };

        if (menuHeaderText === 'Category') {
            menuItem.addEventListener('click', ()=>{
                switch (menuItemsText[i]) {
                    case 'ML / DL':
                        createCategoryPageList(document.getElementById('initPageContainer'), articlesData, 'MLDL');
                        break;
                    
                    case 'Computer Science':
                        createCategoryPageList(document.getElementById('initPageContainer'), articlesData, 'CS');
                        break;
    
                    case 'Et Cetera':
                        createCategoryPageList(document.getElementById('initPageContainer'), articlesData, 'ETC');
                        break;
    
                    case 'Experiments':
                        createCategoryPageList(document.getElementById('initPageContainer'), articlesData, 'EXP');
                        break;
                };
            });
        };
    
        menuItems.appendChild(menuItem);
    }

    menuList.append(menuHeader, menuItems);

    return menuList;
}