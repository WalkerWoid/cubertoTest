class Page {
    constructor() {
        this.arrCheckButtons = [];
        this._initPage();
        this.radioButtons = [];
    }
    _initPage() {
        this._initArrButtons();

        // let cursor = new Cursor();
        let menu = new Menu();
        let checkButtons = new ButtonAll(this.arrCheckButtons, 'form__button__input');
        let radioButtons = new ButtonAll(this.radioButtons, 'form__radio');

    };
    _initArrButtons() {
        this._initCheckButtons();
        this._initRadioButtons();
    }
    _initCheckButtons() {
        this.arrCheckButtons = [
            {id: 'branding', text: 'Брендинг', type: 'checkbox', name: 'interest'},
            {id: 'siteDesign', text: 'Дизайн сайта', type: 'checkbox', name: 'interest'},
            {id: 'appDesign', text: 'Дизайн приложения', type: 'checkbox', name: 'interest'},
            {id: 'ASO', text: 'ASO экспертиза', type: 'checkbox', name: 'interest'},
            {id: 'illustration', text: 'Иллюстрации', type: 'checkbox', name: 'interest'},
            {id: 'htmlAndCss', text: 'HTML/CSS верстка', type: 'checkbox', name: 'interest'},
            {id: 'IOS', text: 'iOS разработка', type: 'checkbox', name: 'interest'},
            {id: 'designConcept', text: 'Дизайн-концепт', type: 'checkbox', name: 'interest'},
            {id: 'androidDeveloping', text: 'Android разработка', type: 'checkbox', name: 'interest'},
            {id: 'kyeSite', text: 'Сайт под ключ', type: 'checkbox', name: 'interest'},
            {id: 'keyApp', text: 'Приложение под ключ', type: 'checkbox', name: 'interest'}
        ]
    }
    _initRadioButtons() {
        this.radioButtons = [
            {id: 'less10000', text: '<10,000', type: 'radio', name: 'budget'},
            {id: 'from10k-to20k', text: '10-20k', type: 'radio', name: 'budget'},
            {id: 'from30k-to40k', text: '30-40k', type: 'radio', name: 'budget'},
            {id: 'from40k-to50k', text: '40-50k', type: 'radio', name: 'budget'},
            {id: 'more50k', text: '>50,000', type: 'radio', name: 'budget'},
        ]
    }
}

// класс курсора
class Cursor {
    constructor() {
        this.cursorContainer = document.querySelector('.cursor');
        this._setCursor();
    }
    _setCursor() {
        document.addEventListener('mousemove', e => {
            if (e.pageY > 0 && e.pageX > 0) {
                if (e.pageY < 1700) {
                    this.cursorContainer.setAttribute('style',
                        `top: ${e.pageY - 5}px; 
                        left: ${e.pageX - 5}px;`);
                } else {
                    this.cursorContainer.setAttribute('style',
                        `top: ${e.pageY - 5}px; 
                        left: ${e.pageX - 5}px; 
                        background-color: white; border: none`);
                }
            } else {
                this.cursorContainer.setAttribute('style', 'display: none');
            }
        });
    }
}

//класс кнопок checkbox и radio
class ButtonAll {
    constructor(arr, container) {
        this.buttonsArr = arr;
        this.buttonsContainer = document.querySelector(`.${container}`);
        this._renderAllButtons();
    }
    _renderAllButtons() {
        // console.log(this.buttonsArr);
        for (const button of this.buttonsArr) {
            let newButton = new Button(button);
            this.buttonsContainer.insertAdjacentHTML('beforeend', newButton._renderButton());
        }
    }
}
// класс нопки checkbox и radio
class Button {
    constructor(button) {
        this.buttonId = button.id;
        this.buttonText = button.text;
        this.buttonType = button.type;
        this.buttonName = button.name;
        this.value = button.value;
    }
    _renderButton() {
        return `<label for="${this.buttonId}" class="check__button-block">
                    <span class="buttonBlack buttonBlack_default"></span>
                    <input class="button__input" type="${this.buttonType}" id="${this.buttonId}" name="${this.buttonName}">
                    <span class="button__label">${this.buttonText}</span>
                    <span class="button-hidden">${this.buttonText}</span>
                </label>`
    }
}

// класс меню
class Menu {
    constructor() {
        this.menuWall = document.querySelector('.menu-wall');
        this.menuContainer = document.querySelector('.menu');
        this.menuIconSpans = document.querySelectorAll('.menu-icon__span');
        this.menuCrossSpans = document.querySelectorAll('.menu__cross-line');
        this._menuInit();
    }
    _menuInit() {
        document.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('header__menu-text') ||
                target.classList.contains('menu-icon') ||
               (target.classList.contains('menu-icon__span'))) {
                this._menuOpen(this.menuWall, this.menuContainer);
            } else if (target.classList.contains('menu__cross') ||
                target.classList.contains('menu__cross-line') ||
                target.classList.contains('menu-wall')){
                this._menuClose(this.menuWall, this.menuContainer)
            }
        });
    }
    _menuOpen(menuWall, menuContainer) {
        menuWall.classList.add('menu-wall_open');
        document.body.style.overflowY = 'hidden';
        menuContainer.classList.add('menu__open');
        for (const menuIconSpan of this.menuIconSpans) {
            menuIconSpan.classList.remove('menu-icon__span_visible');
            menuIconSpan.classList.add('menu-icon__span_hide')
        }

        for (const menuCrossSpan of this.menuCrossSpans) {
            menuCrossSpan.classList.remove('menu__cross-line_hidden');
            menuCrossSpan.classList.add('menu__cross-line_visible')
        }
    }
    _menuClose(menuWall, menuContainer) {
        menuWall.classList.remove('menu-wall_open');
        document.body.style.overflowY = 'auto';
        menuContainer.classList.remove('menu__open');

        for (const menuIconSpan of this.menuIconSpans) {
            menuIconSpan.classList.remove('menu-icon__span_hide');
            menuIconSpan.classList.add('menu-icon__span_visible');
        }

        for (const menuCrossSpan of this.menuCrossSpans) {
            menuCrossSpan.classList.remove('menu__cross-line_visible');
            menuCrossSpan.classList.add('menu__cross-line_hidden');
        }
    }
}
const page = new Page();


// проверка выбранных кнопок
const allUncheckedButtons = document.querySelectorAll('.button__input');

function clickSet() {
    for (const button of allUncheckedButtons) {
        if (button.checked) {
            console.log(button)
        }
    }
}

// preventDefault
const allLinks = document.querySelectorAll('a');
for (const link of allLinks) {
    link.addEventListener('click', (event) => {
        event.preventDefault();
    })
}

// blackButton
let allFormButtons = document.querySelectorAll('.check__button-block');
for (let button of allFormButtons) {
    button.addEventListener('click', (event) => {
        const target = event.target;
        const parentTarget = target.parentNode;
        const blackWall = parentTarget.querySelector('.buttonBlack');
        if (target.classList.contains('button__input')) {
            if (!blackWall.classList.contains('buttonBlack_top')) {
                blackWall.classList.add('buttonBlack_top');
                parentTarget.querySelector('.button__label').classList.add('button__white');
                parentTarget.querySelector('.button-hidden').classList.add('button__white');
            }else {
                blackWall.classList.remove('buttonBlack_top');
                parentTarget.querySelector('.button__label').classList.remove('button__white');
                parentTarget.querySelector('.button-hidden').classList.remove('button__white');
            }
        }
    });
}

const footer = document.querySelector('.footer');
const menuIconSpans = document.querySelectorAll('.menu-icon__span');
function toggleMenuIconColor() {
    if (footer.getBoundingClientRect().y > 110) {
        for (const span of menuIconSpans) {
            span.classList.remove('menu-icon__span_white');
        }
    } else {
        for (const span of menuIconSpans) {
            span.classList.add('menu-icon__span_white');
        }
    }
}
document.addEventListener('mousewheel',  toggleMenuIconColor);
document.addEventListener('mousemove',  toggleMenuIconColor);
