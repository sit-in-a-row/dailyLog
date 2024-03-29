import { createElement } from "../utils/createElement.js";

export function createFooter() {
    const footerContainer = createElement('div', 'footerContainer', 'footerContainer');

    // 인스타그램 링크를 위한 앵커 요소 생성
    const linkInstagram = createElement('a', 'linkInstagram', 'linkInstagram');
    linkInstagram.href = 'https://www.instagram.com/sit_in_a_row';
    linkInstagram.target = '_blank'; // 새 탭에서 링크 열기

    const iconInstagram = createElement('img', 'iconInstagram', 'iconInstagram');
    iconInstagram.src = '../assets/imgs/iconInstagram.svg';

    // 아이콘을 링크에 추가한 다음, 컨테이너에 링크 추가
    linkInstagram.appendChild(iconInstagram);

    // 깃허브 링크를 위한 앵커 요소 생성
    const linkGithub = createElement('a', 'linkGithub', 'linkGithub');
    linkGithub.href = 'https://github.com/sit-in-a-row';
    linkGithub.target = '_blank'; // 새 탭에서 링크 열기

    const iconGithub = createElement('img', 'iconGithub', 'iconGithub');
    iconGithub.src = '../assets/imgs/iconGithub.svg';

    // 아이콘을 링크에 추가한 다음, 컨테이너에 링크 추가
    linkGithub.appendChild(iconGithub);

    const iconMail = createElement('img', 'iconMail', 'iconMail');
    iconMail.src = '../assets/imgs/iconMail.svg';

    // 나머지 아이콘들을 직접 컨테이너에 추가
    footerContainer.append(linkInstagram, linkGithub, iconMail);

    return footerContainer;
}
