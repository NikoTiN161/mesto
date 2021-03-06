export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
        this._closeButton = this._popupElement.querySelector('.overlay__close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('overlay_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('overlay_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    _handleMouseOverClose(e) {
        if (e.target.classList.contains('overlay')) {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.close();
        });

        this._popupElement.addEventListener('mousedown', (e) => {
            this._handleMouseOverClose(e);
        });
    }
}