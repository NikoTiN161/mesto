import { formInputSelector, formSelector } from "../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popupElement.querySelector(formSelector);
    }

    _getInputValues() {
        return inputValues = Array.from(this._popupElement.querySelectorAll(formInputSelector)).map((element) => {
            return element.value;
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', () => {
            this._handleSubmitForm;
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}
