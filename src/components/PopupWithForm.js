import { formInputSelector, formSelector } from "../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popupElement.querySelector(formSelector);
    }

    handleLoading(isLoading) {
        if (isLoading) {
            this._submitButtonText = this._submitButton.textContent;
            this._submitButton.textContent = 'Сохранение...';
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }

    _getInputValues() {
        const inputValues = {};
        Array.from(this._popupElement.querySelectorAll(formInputSelector)).forEach((element) => {
            inputValues[element.name] = element.value;
        })
        return inputValues;
    }

    setInputValue(obj) {
        this._form.name.value = obj.name;
        this._form.about.value = obj.about;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (e) => {
            const formValues = this._getInputValues();
            this._handleSubmitForm(e, formValues);
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}
