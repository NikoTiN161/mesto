import Popup from "./Popup";

export default class PopupConfirm extends Popup {

    handleLoading(isLoading) {
        if (isLoading) {
            this._submitButtonText = this._submitButton.textContent;
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
        this._popupElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this._callback();
        });
    }
}