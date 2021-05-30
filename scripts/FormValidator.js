
export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    }

    _showError(formElement, inputElement, config) {
        const { inputErrorClass, errorClass } = config;
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(errorClass);
    }

    _hideError(formElement, inputElement, config) {
        const { inputErrorClass, errorClass } = config;
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
    }
    
    _hasInvalidInputs(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    
    _checkInputValidity(formElement, inputElement, config) {
        if (inputElement.validity.valid) {
            this._hideError(formElement, inputElement, config);
        } else {
            this._showError(formElement, inputElement, config);
        }
    }

    _setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(this._formElement, inputElement, this._config);
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