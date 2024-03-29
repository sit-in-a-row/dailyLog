// components/header.js와 pages 폴더 내의 모듈을 불러옵니다.
import { createHeader } from "./components/header.js";
import { landing } from "./pages/landing.js";
import { about } from "./pages/about.js";
import { posts } from "./pages/posts.js";
import { experiments } from "./pages/exp.js";

const modelViewer = document.querySelector('#macbook');

// popstate 이벤트를 활용하여 브라우저의 뒤로 가기, 앞으로 가기에 대응합니다.
window.addEventListener('popstate', (event) => {
    router(event.state?.page || 'main', false);
});

// 페이지가 로드될 때 URL에서 상태를 읽어와 해당 페이지를 로드합니다.
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.substring(1);
    router(path || 'main', false);
});

// 라우터 함수: 현재 페이지에 맞는 콘텐츠를 로드합니다.
export function router(page, updateHistory = true) {
    createHeader();

    if (updateHistory) {
        history.pushState({ page: page }, null, `/${page}`);
    }

    modelViewer.cameraOrbit = getCameraOrbit(page);
    initPage(page);

    switch (page) {
        case 'main':
            landing();
            break;
        case 'About Me':
            about();
            break;
        case 'Posts':
            posts();
            break;
        case 'Experiments':
            experiments();
            break;
        default:
            // 없는 페이지를 처리하는 로직이 필요할 수 있습니다.
            console.log("Page not found");
            break;
    }
}

// 페이지 초기화 함수: 현재 페이지를 제외하고 모든 페이지 컨텐츠를 제거합니다.
function initPage(page) {
    delMain();
    delPosts();
    delAbout();
    delExp();
}


function delMain() {
    const getLanding = document.getElementById('landing');
    if (getLanding) {
        document.body.removeChild(getLanding);
    }
}

function delPosts() {
    const getLeftArea = document.getElementById('leftArea');
    const getRightArea = document.getElementById('rightArea');

    if (getLeftArea) {
        document.body.removeChild(getLeftArea);
    };

    if (getRightArea) {
        document.body.removeChild(getRightArea);
    }
}

function delAbout() {
    const getBlackOut = document.getElementById('about-blackOut');

    if (getBlackOut) {
        document.body.removeChild(getBlackOut);
    }
}

function delExp() {
    // 공사 완료 시 수정 필요!!
    const getBlackOut = document.getElementById('temp-blackOut');

    if (getBlackOut) {
        document.body.removeChild(getBlackOut);
    }
}

// 페이지별 카메라 오리엔테이션을 설정하는 함수
function getCameraOrbit(page) {
    switch (page) {
        case 'main':
            return "-30deg 15deg -0.5m";
        case 'About Me':
            return "230deg 90deg -1m";
        case 'Posts':
            return "45deg 69deg 1m";
        case 'Experiments':
            return "-60deg 50deg -1m";
        default:
            return "0deg 0deg 0m";
    }
}

