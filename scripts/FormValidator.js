export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._inputErrorClass = this._config.inputErrorClass;
        this._errorClass = this._config.errorClass;
    }

    _showError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _hasInvalidInputs(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _checkInputValidity(formElement, inputElement) {
        if (inputElement.validity.valid) {
            this._hideError(formElement, inputElement);
        } else {
            this._showError(formElement, inputElement);
        }
    }

    _setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(this._formElement, inputElement);
                this.toggleButtonState();
            })
        });
        this.toggleButtonState();
    };

    toggleButtonState() {
        if (this._hasInvalidInputs(this._inputList)) {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
        } else {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        }
    }

    enableValidation() {
        this._setEventListeners();
    };
}