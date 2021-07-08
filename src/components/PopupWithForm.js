import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSelector, formInputSelector, handleSubmitForm) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popupElement.querySelector(formSelector);
        this._submitButton = this._popupElement.querySelector('.form__save-button');
        this._submitButtonText = this._submitButton.textContent;
        this._inputElements = Array.from(this._popupElement.querySelectorAll(formInputSelector));
    }

    handleLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...';
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }

    _getInputValues() {
        const inputValues = {};
        this._inputElements.forEach((element) => {
            inputValues[element.name] = element.value;
        })
        return inputValues;
    }

    setInputValue(obj) {
        this._inputElements.forEach(element => {
            element.value = obj[element.name];
        }) 
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
