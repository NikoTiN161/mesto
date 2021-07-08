import Popup from "./Popup";

export default class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._submitButton = this._popupElement.querySelector('.form__save-button');
        this._submitButtonText = this._submitButton.textContent;
    }

    handleLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Удаление...';
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }

    setConfirmHandler(callback) {
        this._callback = callback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton = this._popupElement.querySelector('.form__save-button');
        this._popupElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this._callback();
        });
    }
}