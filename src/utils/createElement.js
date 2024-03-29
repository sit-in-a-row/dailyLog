// HTML 태그, id, 클래스
export function createElement(tag, id, className) {
    var element = document.createElement(tag);
    element.id = id;
    element.className = className;
    
    return element;
}

export function clearHTML() {
    var body = document.getElementsByTagName('body');
    body.innerHTML = '';
}

export function checkDuplication(id) {
    const element = document.getElementById(id);
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}
