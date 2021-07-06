import Popup from "./Popup";

export default class PopupConfirm extends Popup {

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