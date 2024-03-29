import { createTitle } from "../components/landingTitle.js";
import { checkDuplication } from "../utils/createElement.js";

export function landing() {
    checkDuplication('canvas');

    const canvas = document.getElementById('canvas');
    if (canvas) {
        canvas.style.display = 'block';
        canvas.style.opacity = '1';
        
        // canvas.style.opacity = '0';
        // canvas.style.transition = 'opacity 1s';

        // setTimeout(() => {
        //     canvas.style.opacity = '1';
        // }, 1000); 
    }

    createTitle();
}
