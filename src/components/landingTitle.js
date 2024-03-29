import { createElement } from "../utils/createElement.js";
import { checkDuplication } from "../utils/createElement.js";

export function createTitle() {
    checkDuplication('landing');

    const title = createElement('section', 'landing', 'landing');
    const landingTitle = createElement('div', 'landingTitle', 'landingTitle')

    title.appendChild(landingTitle);
    document.body.appendChild(title);

    (new TypeIt("#landingTitle", {
        speed: 50,
        startDelay: 1500,
        afterComplete: function (instance) {
            // instance.destroy();
        }
    })
        .type("Sit_in_a_row's", { delay: 100 })
        .move(null, {to: "START", instant: false})
        .move(1, { delay: 100})
        .delete(1)
        .type("S")
        .move(null, {to: "END", instant: true, delay: 300})
        .type("<span class='landing-title-row2'> <br> Daily Log</span>", {delay: 1000, speed: 100})
        .go()
    );
}
