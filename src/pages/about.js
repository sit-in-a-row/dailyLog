import { createElement, checkDuplication } from "../utils/createElement.js";

export function about() {
    checkDuplication('about-blackOut');

    const blackOut = createElement('div', 'about-blackOut', 'about-blackOut');
    blackOut.appendChild(createGrid());
    document.body.appendChild(blackOut);

    return blackOut
}

function createGrid() {
    const gridContainer = createElement('div', 'gridContainer', 'gridContainer');

    for (let i = 0; i < 5; i++) {
        const gridElement = createElement('div', `gridElement${i + 1}`, 'gridElement');
        const gridImg = createElement('img', `gridImg${i + 1}`, 'gridImg');

        // 오버레이와 텍스트 생성
        const overlay = createElement('div', '', 'overlay');
        const overlayText = createElement('div', '', 'overlayText');

        overlay.appendChild(overlayText);
        gridElement.appendChild(gridImg);
        gridElement.appendChild(overlay);

        switch(i) {
            case 0:
                gridImg.src = '../../assets/imgs/grid-1.png';
                overlayText.innerHTML = `
                <div class="gridText">
                    <span class="gridHighlight">안녕하세요!</span> <br> <br>

                    이것저것 잡다하게 올릴 제 블로그에 오신걸 환영합니다. <br> <br>

                    인스타에선 sit_in_a_row, (전)회사에선 Dominik으로 불렸습니다. <br> <br>
                </div>
                `
                break;

            case 1:
                gridImg.src = '../../assets/imgs/grid-2.gif';
                overlayText.innerHTML = `
                <div class="gridText" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    코딩을 좋아하지만 다양한 분야로는 아직 도전해보지 못했습니다. <br> 
                    <div style="width: 70%; background-color: rgba(255,255,255,0.7); border-radius: 2vh; margin: 1vh 0">
                        <img style="width: 100%; height: 100%;" src="../../assets/imgs/grid-2-element.svg"> 
                    </div>
                    다른 분야도 갈 길이 멀지만, 특히 Node JS랑 Flask는 열심히 공부중입니다!
                </div>
                `
                break;

            case 2:
                gridImg.src = '../../assets/imgs/grid-3.gif';
                overlayText.innerHTML = `
                <div class="gridText">
                    저는 자동차를 엄청 좋아합니다. <br> <br>

                    언젠가는 캠핑카도 직접 중고 트럭으로 만들어보고싶고, 
                    오래된 갤로퍼 한 대를 직접 리스토어도 해보려고 합니다. <br> <br>

                    매일매일 사고싶은 차가 바뀌는데, 주식과 코인으로
                    꼭 그럴만한 돈을 벌고싶습니다. <br> <br>

                    그렇지만 지금 단계에서 현실적으로 노릴 수 있는건... 
                    영종도에 있는 BMW 드라이빙 센터인 것 같습니다. <br> <br>

                    돈 열심히 벌어서 매주 주말에는 인제서킷 갈 수 있는 사람이
                    되고싶습니다! <br> <br>
                </div>
                `
                break;

            case 3:
                gridImg.src = '../../assets/imgs/grid-4.gif';
                overlayText.innerHTML = `
                <div class="gridText">
                    언젠가는 비트코인이 꼭 올라서 제가 원하는 차는 아무거나 다 살 수 있는 날이 오기를 꿈꾸고 있습니다. <br> <br>

                    Experiments에도 아마 코인과 관련된 내용들이 잔뜩 올라가지 않을까 합니다.
                </div>
                `
                break;
                
            case 4:
                gridImg.src = '../../assets/imgs/grid-5.gif';
                overlayText.innerHTML = `
                <div class="gridText">
                    클롭이 리버풀에 부임한 이후부터 줄곧 리버풀 팬이었습니다. <br> <br>

                    전설의 램발보 시절부터 챔스 우승, 그리고 클롭을 마지막으로 보게 될 이번 시즌까지,
                    리버풀 팬이어서 정말 행복했습니다.
                </div>
                `
                break;
        }

        gridContainer.appendChild(gridElement);
    }

    document.body.appendChild(gridContainer);

    return gridContainer;
}
