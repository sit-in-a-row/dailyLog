import { createElement } from "../utils/createElement.js";
import { createSearchBar } from "../components/searchBar.js";
import { createMenuList } from "../components/menuList.js";
import { createTagList } from "../components/tagList.js";
import { createFooter } from "../components/footerIcon.js";
import { checkDuplication } from "../utils/createElement.js";
import { fetchArticles, 
    TOTALarticles, 
    CSarticles,
    EXParticles,
    ETCarticles,
    MLDLarticles,
    articlesData
} from "../../articles/landing/articleLanding.js";

const menuHeader1 = 'Category';
const menuList1 = [
    'Computer Science',
    'ML / DL',
    'Et Cetera',
    'Experiments'
]

const menuHeader2 = 'Recent Posts';
// const menuList2 = TOTALarticles.slice(0, 4);

const tagHeader = 'Tags';
// const tagList = [
//     'tag1',
//     'tag2',
//     'tag3',
//     'tag4',
//     'tag5',
//     'tag6'
// ]

// popstate 이벤트 리스너 추가
window.addEventListener('popstate', (event) => {
    const state = event.state;
    const getIframe = document.getElementById('articleArea');

    // 상태 객체에 따라 다른 동작 수행
    if (state) {
        if (state.viewType === 'article') {
            // 상태가 기사 보기 모드일 때 iframe 소스 변경
            if (getIframe) {
                getIframe.src = state.path;
            }
        } else if (state.viewType === 'category') {
            // 상태가 카테고리 보기 모드일 때 카테고리 페이지 생성 함수 호출
            createCategoryPageList(document.getElementById('initPageContainer'), articlesData, state.category, state.currentPage, state.itemsPerPage);
        } 
        // 여기에 다른 viewType을 처리하는 로직을 추가할 수 있습니다.
    } else {
        // state가 null인 경우, 기본 페이지로 이동
        window.location.pathname = '/';
    }
});


const initPageContainer = createElement('div', 'initPageContainer', 'initPageContainer');
let currentPage = 1;
const itemsPerPage = 8;

export async function posts() {
    await fetchArticles();  // 데이터를 가져온 후에 UI를 생성
    createRightArea();
    createLeftArea();
}

export function linkArticle(articlePath) {

    const getInitPageContainer = document.getElementById('initPageContainer');
    const getPaginationContainer = document.getElementById('paginationContainer');
    const getNavBarContainer = document.getElementById('navBarContainer');

    if (getInitPageContainer && getPaginationContainer && getNavBarContainer) {
        getInitPageContainer.innerHTML = '';
        getPaginationContainer.innerHTML = '';
        getNavBarContainer.innerHTML = '';
    }

    const articleUrl = `../articles/${articlePath}.html`;
    const getIframe = document.getElementById('articleArea');
    if (getIframe) {
        getIframe.src = articleUrl;
        history.pushState({ path: articleUrl }, null, `/${articlePath}`);
    }
}

function createLeftArea() {
    checkDuplication('leftArea');

    const leftArea = createElement('div', 'leftArea', 'leftArea');

    const searchBar = createSearchBar();
    const category = createMenuList(menuHeader1, menuList1, articlesData);

    const menuList2 = TOTALarticles.slice(0, 4);
    const recentPosts = createMenuList(menuHeader2, menuList2, articlesData);

    const tagList = getTagList(articlesData);

    const tags = createTagList(tagHeader, tagList);
    const footer = createFooter();

    leftArea.append(searchBar, category, recentPosts, tags, footer);

    document.body.appendChild(leftArea);

    return leftArea;
}

export function createRightArea() {
    checkDuplication('rightArea');

    const rightArea = createElement('div', 'rightArea', 'rightArea');

    const articleArea = createElement('iframe', 'articleArea', 'articleArea');

    const initPageContainer = createElement('div', 'initPageContainer', 'initPageContainer');
    createInitPageList(initPageContainer, articlesData);
    
    rightArea.append(articleArea, initPageContainer);
    
    const paginationContainer = createPagination(articlesData.length, itemsPerPage);
    rightArea.appendChild(paginationContainer);

    document.body.appendChild(rightArea);

    return rightArea;
}

function createInitPageList(container, data) {
    const checkURL = window.location.href;

    if (!checkURL.endsWith('/Posts')) {
        history.pushState(null, null, `/Posts`);
    };

    container.innerHTML = ''; 
    const getArticleArea = document.getElementById('articleArea')
    if (getArticleArea) {
        getArticleArea.innerHTML = '';
    }

    const pageListTitle = createElement('div', 'pageListTitle-init', 'pageListTitle');
    pageListTitle.innerHTML = `전체 보기 <span style="font-size: 4vh;">(${articlesData.length})</span>`;
    container.appendChild(pageListTitle);
    
    data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .forEach((item, index) => {
            const initPageBox = createElement('div', `initPageBox${index}`, 'initPageBox');

            const initPageBoxRow1 = createElement('div', 'initPageBoxRow1', 'initPageBoxRow1');
            const boxCategory = createElement('div', `boxCategory${index}`, 'boxCategory');
            const boxTitle = createElement('div', `boxTitle${index}`, 'boxTitle');
            boxCategory.innerHTML = `[${item.folder}]`;
            boxTitle.innerHTML = item.title;

            const initPageBoxRow2 = createElement('div', 'initPageBoxRow2', 'initPageBoxRow2');
            const boxTime = createElement('div', `boxTime${index}`, 'boxTime');
            boxTime.innerHTML = item.mtime.slice(0, 10);
            initPageBoxRow2.append(boxTitle, boxTime);

            initPageBoxRow1.append(boxCategory, boxTitle);

            initPageBox.append(initPageBoxRow1, initPageBoxRow2);

            initPageBox.addEventListener('click', ()=>{
                linkArticle(`${item.folder}/${item.title}`)
            })

            container.appendChild(initPageBox);
        });
}

export function createCategoryPageList(container, data, category, currentPage = 1, itemsPerPage = 10) {

    // const newURL = `/Posts/${category}`;
    const state = { category, currentPage, itemsPerPage, viewType: 'category' }; // 상태 정보 저장
    // history.pushState(state, null, newURL);
    history.pushState(state, null, '/Posts');

    container.innerHTML = ''; 
    const getArticleArea = document.getElementById('articleArea')
    if (getArticleArea) {
        getArticleArea.src = '';
    }

    const pageListTitle = createElement('div', `pageListTitle-${category}`, 'pageListTitle');
    switch (category) {
        case 'CS':
            pageListTitle.innerHTML = `Computer Science <span style="font-size: 4vh;">(${CSarticles.length})</span>`;
            break;
        
        case 'MLDL':
            pageListTitle.innerHTML = `Machine Learning / Deep Learning <span style="font-size: 4vh;">(${MLDLarticles.length})</span>`;
            break;

        case 'ETC':
            pageListTitle.innerHTML = `Et Cetera <span style="font-size: 4vh;">(${ETCarticles.length})</span>`;
            break;

        case 'EXP':
            pageListTitle.innerHTML = `Experiments <span style="font-size: 4vh;">(${EXParticles.length})</span>`;
            break;
    }

    container.appendChild(pageListTitle);

    // 지정된 카테고리에 해당하는 데이터만 필터링합니다.
    const categoryData = data.filter(item => item.folder === category);

    categoryData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .forEach((item, index) => {
            const initPageBox = createElement('div', `initPageBox${index}`, 'initPageBox');

            const initPageBoxRow1 = createElement('div', 'initPageBoxRow1', 'initPageBoxRow1');
            const boxCategory = createElement('div', `boxCategory${index}`, 'boxCategory');
            const boxTitle = createElement('div', `boxTitle${index}`, 'boxTitle');
            boxCategory.textContent = `[${item.folder}]`;
            boxTitle.textContent = item.title;

            const initPageBoxRow2 = createElement('div', 'initPageBoxRow2', 'initPageBoxRow2');
            const boxTime = createElement('div', `boxTime${index}`, 'boxTime');
            boxTime.textContent = item.mtime.slice(0, 10);
            initPageBoxRow2.appendChild(boxTime);

            initPageBoxRow1.appendChild(boxCategory);
            initPageBoxRow1.appendChild(boxTitle);

            initPageBox.appendChild(initPageBoxRow1);
            initPageBox.appendChild(initPageBoxRow2);

            initPageBox.addEventListener('click', () => {
                linkArticle(`${item.folder}/${item.title}`);
            });

            container.appendChild(initPageBox);
        });
}

function createPagination(totalItems, itemsPerPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = createElement('div', 'paginationContainer', 'paginationContainer');

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = createElement('button', `pageButton${i}`, 'pageButton');
        pageButton.textContent = i;
        pageButton.onclick = () => {
            currentPage = i; // 페이지 번호 갱신
            createInitPageList(document.getElementById('initPageContainer'), articlesData);
        };
        paginationContainer.appendChild(pageButton);
    }

    return paginationContainer;
}

function getTagList(articlesData) {
    let tagList = [];

    if (articlesData) {
        articlesData.forEach(article => {
            
            article.tagItems.forEach(tagItem => {
                // 태그 중복 검사 후 추가
                if (!tagList.includes(tagItem)) {
                    tagList.push(tagItem);
                }
            });
        });
    }

    return tagList;
}
